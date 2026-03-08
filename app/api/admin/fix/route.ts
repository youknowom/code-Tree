import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    await db.update(coursesTable).set({ editorType: "react" }).where(eq(coursesTable.courseId, 1));
    await db.update(coursesTable).set({ editorType: "vanilla" }).where(eq(coursesTable.courseId, 2));
    await db.update(coursesTable).set({ editorType: "vanilla" }).where(eq(coursesTable.courseId, 3));
    await db.update(coursesTable).set({ editorType: "static" }).where(eq(coursesTable.courseId, 4));

    return NextResponse.json({ success: true, message: "Fixed editor_type!" });
}
