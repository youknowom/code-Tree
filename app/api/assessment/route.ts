import { db } from "@/config/db";
import {
  assessmentAttemptsTable,
  certificatesTable,
  courseAssessmentsTable,
  coursesTable,
  enrolledCoursesTable,
  usersTable,
} from "@/config/schema";
import { getCurrentUser } from "@/lib/authHelper";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// Helper to generate unique, secure certificate ID (e.g., CERT-AIML-2026-7K4F9X)
function generateCertificateId(courseId: number): string {
  const year = new Date().getFullYear();
  const randomChars = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `CERT-AIML-${year}-${courseId}${randomChars.slice(0, 4)}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseIdParam = searchParams.get("courseId");

  if (!courseIdParam) {
    return NextResponse.json({ error: "Missing courseId parameter" }, { status: 400 });
  }

  const courseId = parseInt(courseIdParam, 10);
  const user = await getCurrentUser();

  try {
    const assessments = await db
      .select()
      .from(courseAssessmentsTable)
      .where(eq(courseAssessmentsTable.courseId, courseId))
      .limit(1);

    if (assessments.length === 0) {
      return NextResponse.json({ error: "No assessment found for this course" }, { status: 404 });
    }

    const assessment = assessments[0];
    const rawQuestions = (assessment.questions as any[]) || [];

    // Strip answers from questions to prevent cheating
    const sanitizedQuestions = rawQuestions.map((q) => ({
      id: q.id,
      question: q.question,
      options: q.options,
    }));

    let userAttempts: any[] = [];
    let certificate: any = null;

    if (user?.email) {
      const dbUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, user.email))
        .limit(1);

      if (dbUser.length > 0) {
        userAttempts = await db
          .select()
          .from(assessmentAttemptsTable)
          .where(
            and(
              eq(assessmentAttemptsTable.courseId, courseId),
              eq(assessmentAttemptsTable.userId, dbUser[0].id)
            )
          )
          .orderBy(desc(assessmentAttemptsTable.attemptedAt));

        const cert = await db
          .select()
          .from(certificatesTable)
          .where(
            and(
              eq(certificatesTable.courseId, courseId),
              eq(certificatesTable.userId, dbUser[0].id)
            )
          )
          .limit(1);

        if (cert.length > 0) {
          certificate = cert[0];
        }
      }
    }

    return NextResponse.json({
      id: assessment.id,
      courseId: assessment.courseId,
      title: assessment.title,
      description: assessment.description,
      passingScore: assessment.passingScore,
      timeLimitMinutes: assessment.timeLimitMinutes,
      totalQuestions: sanitizedQuestions.length,
      questions: sanitizedQuestions,
      attempts: userAttempts,
      certificate,
    });
  } catch (error) {
    console.error("Error fetching assessment:", error);
    return NextResponse.json({ error: "Failed to load assessment" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Authentication required to submit assessment" }, { status: 401 });
  }

  try {
    const { courseId, answers } = await req.json();

    if (!courseId || !answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Invalid submission data" }, { status: 400 });
    }

    const parsedCourseId = parseInt(courseId, 10);

    // Get DB user
    const dbUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email))
      .limit(1);

    if (dbUsers.length === 0) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    const dbUser = dbUsers[0];

    // Fetch assessment with actual answers
    const assessments = await db
      .select()
      .from(courseAssessmentsTable)
      .where(eq(courseAssessmentsTable.courseId, parsedCourseId))
      .limit(1);

    if (assessments.length === 0) {
      return NextResponse.json({ error: "Assessment does not exist" }, { status: 404 });
    }

    const assessment = assessments[0];
    const questions = (assessment.questions as any[]) || [];
    const totalQuestions = questions.length;

    if (totalQuestions === 0) {
      return NextResponse.json({ error: "Assessment has no questions configured" }, { status: 400 });
    }

    // Server-side grading
    let correctAnswersCount = 0;
    const questionReview: any[] = [];

    questions.forEach((q) => {
      const submittedAnswerIndex = answers[q.id];
      const isCorrect = submittedAnswerIndex === q.correctAnswerIndex;
      if (isCorrect) {
        correctAnswersCount++;
      }
      questionReview.push({
        id: q.id,
        question: q.question,
        options: q.options,
        submittedAnswer: submittedAnswerIndex !== undefined ? submittedAnswerIndex : null,
        correctAnswer: q.correctAnswerIndex,
        isCorrect,
        explanation: q.explanation,
      });
    });

    const score = Math.round((correctAnswersCount / totalQuestions) * 100);
    const passed = score >= (assessment.passingScore || 70);

    // Record Attempt in DB
    await db.insert(assessmentAttemptsTable).values({
      userId: dbUser.id,
      courseId: parsedCourseId,
      assessmentId: assessment.id,
      score,
      totalQuestions,
      correctAnswers: correctAnswersCount,
      passed,
      submittedAnswers: answers,
    });

    let certificateRecord: any = null;

    if (passed) {
      // 1. Update enrollment status to completed
      await db
        .update(enrolledCoursesTable)
        .set({
          completedAt: new Date(),
          status: "completed",
        })
        .where(
          and(
            eq(enrolledCoursesTable.courseId, parsedCourseId),
            eq(enrolledCoursesTable.userId, dbUser.id)
          )
        );

      // 2. Fetch Course metadata
      const courses = await db
        .select()
        .from(coursesTable)
        .where(eq(coursesTable.courseId, parsedCourseId))
        .limit(1);

      const courseData = courses[0];
      const courseOverview = (courseData?.overview as any) || {};

      // 3. IDEMPOTENT Certificate Generation
      const existingCert = await db
        .select()
        .from(certificatesTable)
        .where(
          and(
            eq(certificatesTable.courseId, parsedCourseId),
            eq(certificatesTable.userId, dbUser.id)
          )
        )
        .limit(1);

      if (existingCert.length > 0) {
        certificateRecord = existingCert[0];
        // If current score is higher, update score
        if (score > (existingCert[0].score || 0)) {
          await db
            .update(certificatesTable)
            .set({ score })
            .where(eq(certificatesTable.id, existingCert[0].id));
          certificateRecord.score = score;
        }
      } else {
        const certId = generateCertificateId(parsedCourseId);
        const verificationCode = crypto.randomBytes(8).toString("hex").toUpperCase();

        const [newCert] = await db
          .insert(certificatesTable)
          .values({
            certificateId: certId,
            userId: dbUser.id,
            courseId: parsedCourseId,
            learnerName: dbUser.name || "CodeTree Graduate",
            courseTitle: courseData?.title || "Machine Learning Specialization",
            score,
            verificationCode,
            instructor: courseData?.instructor || "CodeTree AI Faculty",
            duration: courseData?.duration || "12 Hours",
            skillsCovered: courseOverview.skillsCovered || ["Machine Learning", "Model Evaluation"],
            metadata: {
              issuedBy: "CodeTree Institute of AI & Machine Learning",
              accreditation: "Verified Certificate of Completion",
              passingScore: assessment.passingScore || 70,
            },
          })
          .returning();

        certificateRecord = newCert;
      }
    }

    return NextResponse.json({
      success: true,
      passed,
      score,
      passingScore: assessment.passingScore,
      totalQuestions,
      correctAnswers: correctAnswersCount,
      questionReview,
      certificate: certificateRecord,
      message: passed
        ? `Congratulations! You passed with ${score}%. Your verified certificate is ready.`
        : `You scored ${score}%. A passing score of ${assessment.passingScore}% is required. Review the modules and retake when ready!`,
    });
  } catch (error) {
    console.error("Error evaluating assessment:", error);
    return NextResponse.json({ error: "Failed to process assessment submission" }, { status: 500 });
  }
}
