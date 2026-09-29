import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
    const auth = await verifyAdmin(req);
    if (!auth.authorized) return auth.response!;
    await db.update(coursesTable).set({ editorType: "react" }).where(eq(coursesTable.courseId, 1));
    await db.update(coursesTable).set({ editorType: "static" }).where(eq(coursesTable.courseId, 2));
    await db.update(coursesTable).set({ editorType: "static" }).where(eq(coursesTable.courseId, 3));
    await db.update(coursesTable).set({
        title: "JavaScript Core",
        description: "Master modern JavaScript: syntax, data types, functions, DOM manipulation, asynchronous programming, and ES6+.",
        tags: "JAVASCRIPT",
        editorType: "vanilla"
    }).where(eq(coursesTable.courseId, 4));

    return NextResponse.json({ success: true, message: "Fixed editor_type!" });
}
