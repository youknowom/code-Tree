import { db } from "@/config/db";
import {
  completedExercisesTable,
  courseChaptersTable,
  coursesTable,
  exercisesTable,
  usersTable,
} from "@/config/schema";
import { getCurrentUser } from "@/lib/authHelper";
import { and, eq, or, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
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

  const chTableId = courseResult[0]?.id;

  // Query exercise with dual check: chapterId can match logical chapterId OR course_chapters.id
  const exerciseResult = await db
    .select()
    .from(exercisesTable)
    .where(
      and(
        eq(exercisesTable.courseId, courseId),
        sql`(${exercisesTable.chapterId} = ${chapterId} OR ${exercisesTable.chapterId} = ${chTableId ?? -1})`,
        eq(exercisesTable.exerciseId, exerciseId)
      )
    );

  let exercise = exerciseResult[0];

  // Helper to strip unsightly legacy <body> tags from stored HTML
  const cleanDbHtml = (html?: string) => {
    if (!html) return "";
    return html
      .replace(/<\/?(?:body|html|head)[^>]*>/gi, "")
      .replace(/style\s*=\s*(?:'[^']*'|"[^"]*")/gi, "")
      .trim();
  };

  const chExercises = (courseResult[0]?.exercises as any[]) || [];
  const chEx = chExercises.find((e: any) => e.slug === exerciseId) || chExercises[0];
  const exerciseName = exercise?.exerciseName || chEx?.name || exerciseId;

  const defaultStarterCode =
    courseInfo[0]?.editorType === "react"
      ? 'export default function App() {\n  return (\n    <div className="p-4">\n      {/* Write your solution here */}\n    </div>\n  );\n}'
      : courseInfo[0]?.editorType === "python"
      ? '# Write your solution below:\n'
      : courseInfo[0]?.editorType === "vanilla-ts"
      ? '// Write your solution below:\n'
      : '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>Practice</title>\n</head>\n<body>\n  <!-- Write your solution here -->\n</body>\n</html>';

  let rawContent = (exercise?.exercisesContent as any) || {};

  const exerciseContent = {
    content: cleanDbHtml(rawContent.content) || `<h2>${exerciseName}</h2><p>Practice the core concepts for this lesson by implementing the challenge in the interactive editor.</p>`,
    task: cleanDbHtml(rawContent.task) || `Implement your solution for <strong>${exerciseName}</strong> according to the lesson specifications.`,
    hint: cleanDbHtml(rawContent.hint) || `Carefully check your syntax, variable names, and function return values. Switch to the Gemini AI tab if you need guidance.`,
    startCode: rawContent.startCode || rawContent.starterCode || defaultStarterCode,
    starterCode: rawContent.starterCode || rawContent.startCode || defaultStarterCode,
    regex: rawContent.regex || "",
    output: rawContent.output || "",
  };

  // Get current user to fetch their completed exercises
  const user = await getCurrentUser();
  let completedExercise: any[] = [];

  if (user?.email) {
    const dbUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email));

    if (dbUser.length > 0) {
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
    completedExercise,
    ExerciseData: {
      chapterId: exercise?.chapterId ?? chapterId,
      courseId: exercise?.courseId ?? courseId,
      exerciseId: exercise?.exerciseId ?? exerciseId,
      exerciseName,
      exerciseContent,
    },
    editorType: courseInfo[0]?.editorType,
  });
  } catch (error: any) {
    console.error("Error in /api/exercise:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercise", details: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

