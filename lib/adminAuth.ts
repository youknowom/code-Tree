import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function verifyAdmin(
  req?: NextRequest
): Promise<{ authorized: boolean; response?: NextResponse }> {
  const adminSecret = process.env.ADMIN_SECRET;

  // 1. Check admin secret header if configured
  if (req && adminSecret) {
    const authHeader =
      req.headers.get("x-admin-secret") ||
      req.headers.get("authorization")?.replace("Bearer ", "");
    if (authHeader === adminSecret) {
      return { authorized: true };
    }
  }

  // 2. Check Auth session user
  try {
    const session = await auth();
    const user = session?.user;
    if (!user || !user.email) {
      return {
        authorized: false,
        response: NextResponse.json(
          { error: "Unauthorized: Authentication required" },
          { status: 401 }
        ),
      };
    }

    // Check ADMIN_EMAILS env list
    const adminEmails =
      process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim().toLowerCase()) || [];
    const userEmail = user.email.toLowerCase();
    if (adminEmails.includes(userEmail)) {
      return { authorized: true };
    }

    // In local development, if neither ADMIN_SECRET nor ADMIN_EMAILS is set, allow authenticated user with warning
    if (
      process.env.NODE_ENV === "development" &&
      !adminSecret &&
      adminEmails.length === 0
    ) {
      console.warn(
        "⚠️ [DEV] Admin route accessed without ADMIN_SECRET or ADMIN_EMAILS set. Allowed because NODE_ENV=development."
      );
      return { authorized: true };
    }

    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Forbidden: Admin privileges required" },
        { status: 403 }
      ),
    };
  } catch {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: "Internal server error during auth verification" },
        { status: 500 }
      ),
    };
  }
}
