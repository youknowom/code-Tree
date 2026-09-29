import { db } from "@/config/db";
import { certificatesTable, coursesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ certId: string }> }
) {
  try {
    const { certId } = await params;

    if (!certId) {
      return NextResponse.json({ error: "Missing certificate ID" }, { status: 400 });
    }

    const certificates = await db
      .select({
        certificateId: certificatesTable.certificateId,
        learnerName: certificatesTable.learnerName,
        courseTitle: certificatesTable.courseTitle,
        score: certificatesTable.score,
        issuedAt: certificatesTable.issuedAt,
        instructor: certificatesTable.instructor,
        duration: certificatesTable.duration,
        skillsCovered: certificatesTable.skillsCovered,
        metadata: certificatesTable.metadata,
        courseId: certificatesTable.courseId,
      })
      .from(certificatesTable)
      .where(eq(certificatesTable.certificateId, certId.toUpperCase()))
      .limit(1);

    if (certificates.length === 0) {
      return NextResponse.json(
        {
          verified: false,
          error: "Certificate not found or has been revoked.",
        },
        { status: 404 }
      );
    }

    const cert = certificates[0];

    // Fetch course banner image or details
    const courses = await db
      .select({
        bannerImage: coursesTable.bannerImage,
        tags: coursesTable.tags,
        level: coursesTable.level,
      })
      .from(coursesTable)
      .where(eq(coursesTable.courseId, cert.courseId))
      .limit(1);

    return NextResponse.json({
      verified: true,
      certificate: {
        ...cert,
        course: courses[0] || null,
        issuingPlatform: "CodeTree AI & Machine Learning Academy",
        status: "Active & Validated",
      },
    });
  } catch (error) {
    console.error("Error verifying certificate:", error);
    return NextResponse.json({ error: "Server error verifying certificate" }, { status: 500 });
  }
}
