import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/adminAuth";
import { seedCurriculum } from "@/scripts/seed-curriculum";

export async function GET(req: NextRequest) {
  const auth = await verifyAdmin(req);
  if (!auth.authorized) return auth.response!;

  try {
    await seedCurriculum();
    return NextResponse.json({
      success: true,
      message: "Curriculum successfully seeded with courses 5 through 8!",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to seed curriculum",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return GET(req);
}
