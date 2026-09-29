import { db } from "@/config/db";
import { enrolledCoursesTable, usersTable } from "@/config/schema";
import { getCurrentUser } from "@/lib/authHelper";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { courseId } = await req.json();

  if (!courseId || typeof courseId !== "number") {
    return NextResponse.json({ error: "Invalid courseId" }, { status: 400 });
  }

  const user = await getCurrentUser();
  const email = user?.email;

  if (!user || !email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existingUsers = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));

  const dbUser =
    existingUsers[0] ??
    (
      await db
        .insert(usersTable)
        .values({ name: user.name ?? "Learner", email, points: 0 })
        .returning()
    )[0];

  const inserted = await db
    .insert(enrolledCoursesTable)
    .values({ courseId, userId: dbUser.id, xpEarned: 0 })
    .returning();

  return NextResponse.json(inserted[0], { status: 201 });
}
