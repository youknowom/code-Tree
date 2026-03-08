import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// All routes that do NOT require authentication
const isPublicRoute = createRouteMatcher([
  "/",                  // landing
  "/courses(.*)",       // course browsing (read-only)
  "/pricing(.*)",       // pricing page
  "/contact(.*)",       // contact page
  "/sign-in(.*)",       // auth pages
  "/sign-up(.*)",
  "/api/course(.*)",    // public course listing API
  "/api/webhook(.*)",   // webhooks (if any)
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    // Protect all non-public routes (dashboard, exercise, API mutations)
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
