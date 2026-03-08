import { db } from "@/config/db";
import {
  completedExercisesTable,
  courseChaptersTable,
  coursesTable,
  exercisesTable,
  usersTable,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { courseId, chapterId, exerciseId } = await req.json();

  // ✅ Fix: query coursesTable with courseId (was incorrectly using chapterId)
  const courseInfo = await db
    .select()
    .from(coursesTable)
    .where(eq(coursesTable.courseId, courseId));

  const courseResult = await db
    .select()
    .from(courseChaptersTable)
    .where(
      and(
        eq(courseChaptersTable.courseId, courseId),
        eq(courseChaptersTable.chapterId, chapterId)
      )
    );

  const exerciseResult = await db
    .select()
    .from(exercisesTable)
    .where(
      and(
        eq(exercisesTable.chapterId, chapterId),
        eq(exercisesTable.exerciseId, exerciseId)
      )
    );

  const exercise = exerciseResult[0];

  // Get current user to fetch their completed exercises
  const user = await currentUser();
  let completedExercise: any[] = [];

  if (user?.primaryEmailAddress?.emailAddress) {
    const dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));

    if (dbUser.length > 0) {
      // ✅ Fetch completed exercises for this course+chapter for this user
      completedExercise = await db
        .select()
        .from(completedExercisesTable)
        .where(
          and(
            eq(completedExercisesTable.courseId, courseId),
            eq(completedExercisesTable.userId, dbUser[0].id)
          )
        );
    }
  }

  return NextResponse.json({
    ...courseResult[0],
    courseId,
    chapterId,
    // ✅ completedExercise at top level (where CodeEditor checks it)
    completedExercise,
    ExerciseData: {
      chapterId: exercise?.chapterId,
      courseId: exercise?.courseId,
      exerciseId: exercise?.exerciseId,
      exerciseName: exercise?.exerciseName,
      exerciseContent: exercise?.exercisesContent,
    },
    // ✅ editorType at top level (where CodeEditor uses it)
    editorType: courseInfo[0]?.editorType,
  });
}
