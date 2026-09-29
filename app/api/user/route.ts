import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { getCurrentUser } from "@/lib/authHelper";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();

  if (!user || !user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // check if user already exists
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, user.email));

  // if not, create user
  if (users.length === 0) {
    const newUser = {
      name: user.name ?? "Learner",
      email: user.email,
      points: 0,
    };

    const result = await db.insert(usersTable).values(newUser).returning();
    return NextResponse.json(result[0]);
  }

  // return existing user
  return NextResponse.json(users[0]);
}
