import { db } from "@/config/db";
import { certificatesTable, coursesTable, usersTable } from "@/config/schema";
import { getCurrentUser } from "@/lib/authHelper";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getCurrentUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const dbUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, user.email))
      .limit(1);

    if (dbUsers.length === 0) {
      return NextResponse.json([]);
    }

    const certificates = await db
      .select({
        id: certificatesTable.id,
        certificateId: certificatesTable.certificateId,
        courseId: certificatesTable.courseId,
        courseTitle: certificatesTable.courseTitle,
        learnerName: certificatesTable.learnerName,
        score: certificatesTable.score,
        issuedAt: certificatesTable.issuedAt,
        instructor: certificatesTable.instructor,
        duration: certificatesTable.duration,
        skillsCovered: certificatesTable.skillsCovered,
        metadata: certificatesTable.metadata,
      })
      .from(certificatesTable)
      .where(eq(certificatesTable.userId, dbUsers[0].id))
      .orderBy(desc(certificatesTable.issuedAt));

    // Also attach course banner/tags
    const allCourses = await db.select().from(coursesTable);
    const courseMap = new Map(allCourses.map((c) => [c.courseId, c]));

    const enriched = certificates.map((cert) => {
      const course = courseMap.get(cert.courseId);
      return {
        ...cert,
        bannerImage: course?.bannerImage,
        level: course?.level || "Intermediate",
        tags: course?.tags || "AI/ML",
      };
    });

    return NextResponse.json(enriched);
  } catch (error) {
    console.error("Error fetching user certificates:", error);
    return NextResponse.json({ error: "Failed to load certificates" }, { status: 500 });
  }
}
