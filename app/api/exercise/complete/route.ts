import { db } from "@/config/db";
import {
  completedExercisesTable,
  usersTable,
  courseChaptersTable,
  enrolledCoursesTable,
  exercisesTable,
} from "@/config/schema";
import { getCurrentUser } from "@/lib/authHelper";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { validateCode } from "@/lib/validateCode";

export async function POST(req: NextRequest) {
  try {
    const { courseId, chapterId, exerciseId, xpEarned, userCode } = await req.json();
    const user = await getCurrentUser();

    if (!user?.email) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    // Server-side strict check: reject blank or empty code
    if (!userCode || typeof userCode !== "string" || userCode.trim().length === 0) {
      return NextResponse.json(
        { error: "Please write your code solution before submitting. Blank submissions are not accepted." },
        { status: 400 }
      );
    }

    // Get or create user in database
    let dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email))
      .limit(1);

    if (!dbUser || dbUser.length === 0) {
      const newUser = await db
        .insert(usersTable)
        .values({
          email: user.email,
          name: user.name || "Learner",
        })
        .returning();
      dbUser = newUser;
    }

    // Get the actual chapter table ID (not logical chapterId)
    const chapter = await db
      .select()
      .from(courseChaptersTable)
      .where(
        and(
          eq(courseChaptersTable.courseId, courseId),
          eq(courseChaptersTable.chapterId, chapterId)
        )
      )
      .limit(1);

    if (!chapter || chapter.length === 0) {
      return NextResponse.json({ error: "Chapter not found" }, { status: 404 });
    }

    // Fetch exercise from DB to validate against starter code and regex
    // Support both logical chapterId (1, 2...) and database PK (chapter[0].id)
    const exercisesInChapter = await db
      .select()
      .from(exercisesTable)
      .where(
        and(
          eq(exercisesTable.courseId, courseId),
          sql`(${exercisesTable.chapterId} = ${chapterId} OR ${exercisesTable.chapterId} = ${chapter[0].id})`
        )
      );

    let targetEx =
      exercisesInChapter.find(
        (e) =>
          String(e.exerciseId) === String(exerciseId) ||
          String(e.id) === String(exerciseId)
      ) ||
      (typeof exerciseId === "number" ? exercisesInChapter[exerciseId - 1] : undefined) ||
      exercisesInChapter[0];

    let contentObj = (targetEx?.exercisesContent as any) || {};

    // Fallback: check chapter exercises JSON if not in exercisesTable
    if (!targetEx && chapter[0].exercises) {
      const chExercises = chapter[0].exercises as any[];
      if (Array.isArray(chExercises) && chExercises.length > 0) {
        const found =
          chExercises.find(
            (e) => String(e.slug) === String(exerciseId) || String(e.id) === String(exerciseId)
          ) || chExercises[0];
        if (found) {
          contentObj = {
            task: found.task || found.name,
            hint: found.hint,
            starterCode: found.starterCode,
            regex: found.regex,
          };
        }
      }
    }

    const validation = validateCode(
      userCode,
      contentObj.starterCode || contentObj.startCode,
      {
        regex: contentObj.regex,
        output: contentObj.output,
        task: contentObj.task,
      }
    );

    if (!validation.passed) {
      return NextResponse.json(
        { error: validation.message || "Your code does not satisfy the requirements." },
        { status: 400 }
      );
    }


    // Check if already completed
    const existing = await db
      .select()
      .from(completedExercisesTable)
      .where(
        and(
          eq(completedExercisesTable.userId, dbUser[0].id),
          eq(completedExercisesTable.courseId, courseId),
          eq(completedExercisesTable.chapterId, chapter[0].id),
          eq(completedExercisesTable.exerciseId, exerciseId)
        )
      )
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({
        alreadyCompleted: true,
        message: "Exercise already completed",
      });
    }

    // Insert completion record
    const result = await db
      .insert(completedExercisesTable)
      .values({
        chapterId: chapter[0].id, // Use actual DB id, not logical chapterId
        courseId: courseId,
        exerciseId: exerciseId,
        userId: dbUser[0].id,
      })
      .returning();

    // Server-determined XP — never trust client-sent values
    const serverXp = 50;

    // Update Course XP Earned (with userId filter to prevent cross-user modification)
    await db
      .update(enrolledCoursesTable)
      .set({ xpEarned: sql`${enrolledCoursesTable.xpEarned}+${serverXp}` })
      .where(
        and(
          eq(enrolledCoursesTable.courseId, courseId),
          eq(enrolledCoursesTable.userId, dbUser[0].id)
        )
      );

    // Update User XP Points
    await db
      .update(usersTable)
      .set({
        points: sql`${usersTable.points}+${serverXp}`,
      })
      .where(eq(usersTable.id, dbUser[0].id));
    return NextResponse.json({
      success: true,
      alreadyCompleted: false,
      data: result,
    });
  } catch (error: any) {
    console.error("Error completing exercise:", error);
    return NextResponse.json(
      {
        error: "Failed to complete exercise",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
