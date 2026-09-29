import { db } from "@/config/db";
import { exercisesTable } from "@/config/schema";
import { EXERCISES } from "@/data/exercises";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const auth = await verifyAdmin(req);
  if (!auth.authorized) return auth.response!;

  try {
    const COURSE_ID = 2; // change per course

    // Remove old exercises for this course
    await db
      .delete(exercisesTable)
      .where(eq(exercisesTable.courseId, COURSE_ID));

    const rowsToInsert = EXERCISES.filter(
      (item) => item.courseId === COURSE_ID
    );

    if (rowsToInsert.length === 0) {
      return NextResponse.json(
        { success: false, message: "No exercises to insert for this course" },
        { status: 400 }
      );
    }

    const inserted = await db
      .insert(exercisesTable)
      .values(rowsToInsert)
      .returning({ id: exercisesTable.id });

    return NextResponse.json({
      success: true,
      message: "Exercises seeded successfully",
      totalInserted: inserted.length,
    });
  } catch (error) {
    console.error("Exercise seeding failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to seed exercises",
      },
      { status: 500 }
    );
  }
}
