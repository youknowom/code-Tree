import { db } from "@/config/db";
import {
  certificatesTable,
  completedExercisesTable,
  courseAssessmentsTable,
  courseChaptersTable,
  coursesTable,
  enrolledCoursesTable,
  usersTable,
} from "@/config/schema";
import { getCurrentUser } from "@/lib/authHelper";
import { and, asc, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const user = await getCurrentUser();

  if (courseId && courseId != "enrolled") {
    const parsedCourseId = parseInt(courseId, 10);
    const result = await db
      .select()
      .from(coursesTable)
      .where(eq(coursesTable.courseId, parsedCourseId));

    if (result.length === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const chapterResult = await db
      .select()
      .from(courseChaptersTable)
      .where(eq(courseChaptersTable.courseId, parsedCourseId))
      .orderBy(asc(courseChaptersTable.chapterId));

    // Fetch assessment info (excluding answers)
    const assessmentResult = await db
      .select({
        id: courseAssessmentsTable.id,
        courseId: courseAssessmentsTable.courseId,
        title: courseAssessmentsTable.title,
        description: courseAssessmentsTable.description,
        passingScore: courseAssessmentsTable.passingScore,
        timeLimitMinutes: courseAssessmentsTable.timeLimitMinutes,
      })
      .from(courseAssessmentsTable)
      .where(eq(courseAssessmentsTable.courseId, parsedCourseId));

    let isEnrolledCourse = false;
    let enrollCourse: any[] = [];
    let completedExcercises: any[] = [];
    let certificateInfo: any = null;

    if (user?.email) {
      const dbUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, user.email));

      if (dbUser.length > 0) {
        enrollCourse = await db
          .select()
          .from(enrolledCoursesTable)
          .where(
            and(
              eq(enrolledCoursesTable.courseId, parsedCourseId),
              eq(enrolledCoursesTable.userId, dbUser[0].id)
            )
          );
        isEnrolledCourse = enrollCourse?.length > 0 ? true : false;

        // Fetch completed exercises using numeric IDs
        completedExcercises = await db
          .select()
          .from(completedExercisesTable)
          .where(
            and(
              eq(completedExercisesTable.courseId, parsedCourseId),
              eq(completedExercisesTable.userId, dbUser[0].id)
            )
          )
          .orderBy(
            desc(completedExercisesTable.courseId),
            desc(completedExercisesTable.exerciseId)
          );

        // Fetch Certificate if issued
        const cert = await db
          .select()
          .from(certificatesTable)
          .where(
            and(
              eq(certificatesTable.courseId, parsedCourseId),
              eq(certificatesTable.userId, dbUser[0].id)
            )
          )
          .limit(1);

        if (cert.length > 0) {
          certificateInfo = cert[0];
        }
      }
    }

    return NextResponse.json({
      ...result[0],
      chapters: chapterResult,
      userEnrolled: isEnrolledCourse,
      courseEnrolledInfo: enrollCourse[0],
      completedExcercises: completedExcercises,
      assessment: assessmentResult[0] || null,
      certificate: certificateInfo,
    });
  } else if (courseId == "enrolled") {
    if (!user?.email) {
      return NextResponse.json([]);
    }

    const dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));

    if (dbUser.length === 0) {
      return NextResponse.json([]);
    }

    const userId = dbUser[0].id;

    // 1️⃣ Fetch all enrolled courses for the user
    const enrolledCourses = await db
      .select()
      .from(enrolledCoursesTable)
      .where(eq(enrolledCoursesTable.userId, userId));

    if (enrolledCourses.length === 0) {
      return NextResponse.json([]);
    }

    // Extract courseIds
    const courseIds = enrolledCourses.map((c) => c.courseId);

    // 2️⃣ Fetch all course details
    const courses = await db.select().from(coursesTable);

    // Filter courses by courseIds
    const filteredCourses = courses.filter((course) =>
      courseIds.includes(course.courseId)
    );

    // 3️⃣ Fetch chapters for all courses
    const chapters = await db
      .select()
      .from(courseChaptersTable)
      .orderBy(asc(courseChaptersTable.chapterId));

    const filteredChapters = chapters.filter((chapter) =>
      courseIds.includes(chapter.courseId)
    );

    // 4️⃣ Fetch completed exercises for all courses
    const completed = await db
      .select()
      .from(completedExercisesTable)
      .where(eq(completedExercisesTable.userId, userId))
      .orderBy(
        desc(completedExercisesTable.courseId),
        desc(completedExercisesTable.exerciseId)
      );

    // 5️⃣ Fetch certificates for user
    const userCerts = await db
      .select()
      .from(certificatesTable)
      .where(eq(certificatesTable.userId, userId));

    const finalResult = filteredCourses.map((course) => {
      const courseEnrollInfo = enrolledCourses.find(
        (e) => e.courseId === course.courseId
      );
      const cert = userCerts.find((c) => c.courseId === course.courseId);

      return {
        ...course,
        chapters: filteredChapters.filter(
          (ch) => ch.courseId === course.courseId
        ),
        completedExercises: completed.filter(
          (cx) => cx.courseId === course.courseId
        ),
        courseEnrolledInfo: courseEnrollInfo,
        userEnrolled: true,
        certificate: cert || null,
      };
    });

    // ⭐ Format output
    const formattedResult = finalResult.map((item) => {
      // Count total exercises by summing exercises arrays in all chapters
      const totalExercises = item.chapters.reduce((acc, chapter) => {
        const exercisesCount = Array.isArray(chapter.exercises)
          ? chapter.exercises.length
          : 0;
        return acc + exercisesCount;
      }, 0);

      const completedExercises = item.completedExercises.length;
      const progressPercent = totalExercises > 0
        ? Math.round((completedExercises / totalExercises) * 100)
        : 0;

      return {
        courseId: item.courseId,
        title: item.title,
        description: item.description,
        bannerImage: item?.bannerImage,
        category: item.category || "AI/ML",
        duration: item.duration || "8 Hours",
        instructor: item.instructor || "CodeTree AI Faculty",
        totalExercises,
        completedExercises,
        progressPercent,
        xpEarned: item.courseEnrolledInfo?.xpEarned || 0,
        level: item.level,
        status: item.certificate ? "certificate_issued" : progressPercent === 100 ? "completed" : "in_progress",
        certificate: item.certificate,
      };
    });

    return NextResponse.json(formattedResult);
  } else {
    // Fetch all published courses ordered by courseId
    const result = await db
      .select()
      .from(coursesTable)
      .orderBy(asc(coursesTable.courseId));
    return NextResponse.json(result);
  }
}
