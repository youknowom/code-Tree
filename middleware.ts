import { auth } from "@/auth";
import { NextResponse } from "next/server";

const publicRoutes = [
  "/",
  "/courses",
  "/pricing",
  "/contact",
  "/sign-in",
  "/sign-up",
  "/verify",
  "/api/auth",
  "/api/course",
  "/api/exercise",
  "/api/ai/hint",
  "/api/assessment",
  "/api/certificate/verify",
];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublic =
    publicRoutes.some(
      (route) =>
        nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
    ) || nextUrl.pathname.startsWith("/api/auth");

  if (!isLoggedIn && !isPublic) {
    const signInUrl = new URL("/sign-in", nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
