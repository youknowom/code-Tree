"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CodeTreeLogo from "@/components/CodeTreeLogo";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { Course } from "../(routes)/courses/_components/CourseList";
import {
  BookOpen,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
  LogOut,
  User as UserIcon,
  Flame,
  ArrowRight,
  Code2,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { data: session, status } = useSession();
  const isSignedIn = !!session?.user;
  const isLoaded = status !== "loading";
  const user = session?.user;
  const path = usePathname();
  const { exerciseslug } = useParams();

  const [courses, setCourses] = useState<Course[]>([]);
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (isSignedIn) {
      getUserPoints();
    }
  }, [isSignedIn]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCourses = async () => {
    try {
      const result = await axios.get("/api/course");
      setCourses(result.data || []);
    } catch {
      // silent
    }
  };

  const getUserPoints = async () => {
    try {
      const res = await axios.post("/api/user");
      if (res.data?.points !== undefined) {
        setUserPoints(res.data.points);
      }
    } catch {
      // silent
    }
  };

  // Exercise workspace has its own focused top-bar
  if (exerciseslug) return null;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-200 border-b",
          scrolled
            ? "bg-[var(--bg-page)]/90 backdrop-blur-md border-[var(--border-default)] shadow-xs"
            : "bg-[var(--bg-page)] border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* ── Brand Logo ── */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <CodeTreeLogo size="md" />
            <span className="hidden lg:inline-flex text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20">
              Beta
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Courses / Tracks Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <Link
                href="/courses"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  path.startsWith("/courses")
                    ? "text-[var(--fg)] bg-[var(--overlay-8)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--overlay-6)]"
                )}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Tracks
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform duration-200 opacity-60",
                    coursesDropdownOpen && "rotate-180"
                  )}
                />
              </Link>

              {/* Dropdown Panel */}
              <div
                className={cn(
                  "absolute top-full left-0 w-[560px] pt-2",
                  coursesDropdownOpen ? "block" : "hidden"
                )}
              >
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] shadow-xl overflow-hidden animate-fade-in-up">
                  <div className="p-3 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--fg-muted)] uppercase tracking-wider">
                      Guided Learning Tracks
                    </span>
                    <Link
                      href="/courses"
                      className="text-xs font-semibold text-amber-500 dark:text-amber-400 hover:underline flex items-center gap-1"
                    >
                      View all ({courses.length}) <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="p-3 grid grid-cols-2 gap-2 max-h-[360px] overflow-y-auto">
                    {courses.slice(0, 8).map((course) => (
                      <Link
                        key={course.courseId}
                        href={`/courses/${course.courseId}`}
                        className="group flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[var(--overlay-6)] transition-all"
                      >
                        <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 dark:text-amber-400 mt-0.5 border border-amber-500/20 group-hover:bg-amber-500/20">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--fg)] group-hover:text-amber-500 dark:group-hover:text-amber-400 truncate">
                            {course.title}
                          </p>
                          <p className="text-xs text-[var(--fg-subtle)] line-clamp-1">
                            {course.level || "Beginner"} · {course.tags || "Code"}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Tracks link */}
            <Link
              href="/courses"
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                path === "/courses"
                  ? "text-[var(--fg)] bg-[var(--overlay-8)]"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--overlay-6)]"
              )}
            >
              Curriculum
            </Link>

            {/* Dashboard link if signed in */}
            {isSignedIn && (
              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  path === "/dashboard"
                    ? "text-[var(--fg)] bg-[var(--overlay-8)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--overlay-6)]"
                )}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </Link>
            )}

            {/* Pricing / Free Access */}
            <Link
              href="/pricing"
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                path === "/pricing"
                  ? "text-[var(--fg)] bg-[var(--overlay-8)]"
                  : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--overlay-6)]"
              )}
            >
              Free Access
            </Link>
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2">
            {/* Live XP Pill when signed in */}
            {mounted && isSignedIn && userPoints !== null && (
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-500 dark:text-amber-400 text-xs font-bold hover:bg-amber-500/15 transition-colors"
                title="Your accumulated XP"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{userPoints} XP</span>
              </Link>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth States */}
            {!mounted || !isLoaded ? (
              <div className="w-8 h-8 rounded-full bg-[var(--overlay-8)] animate-pulse" />
            ) : !isSignedIn ? (
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden sm:inline-flex text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--overlay-8)] font-medium h-9 px-3"
                >
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold text-xs h-9 px-3.5 shadow-sm border border-amber-400/30"
                >
                  <Link href="/sign-up">Start Free</Link>
                </Button>
              </div>
            ) : (
              /* User Menu Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 rounded-full border border-[var(--border-default)] hover:border-amber-400/50 transition-all cursor-pointer">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold text-xs">
                        {user?.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 p-1.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] shadow-xl"
                >
                  <div className="px-3 py-2 border-b border-[var(--border-subtle)]">
                    <p className="text-sm font-semibold text-[var(--fg)] truncate">
                      {user?.name || "Learner"}
                    </p>
                    <p className="text-xs text-[var(--fg-subtle)] truncate">
                      {user?.email}
                    </p>
                  </div>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[var(--fg)] rounded-lg hover:bg-[var(--overlay-8)] cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-amber-500" />
                      Learning Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/courses"
                      className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[var(--fg)] rounded-lg hover:bg-[var(--overlay-8)] cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                      Browse Curriculum
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 border-[var(--border-subtle)]" />

                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-500 rounded-lg hover:bg-rose-500/10 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--overlay-8)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[var(--border-default)] bg-[var(--bg-card)] px-4 pt-3 pb-6 space-y-3 animate-fade-in-up">
            <Link
              href="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-lg text-sm font-semibold text-[var(--fg)] hover:bg-[var(--overlay-8)]"
            >
              <BookOpen className="w-4 h-4 text-amber-500" />
              All Tracks & Curriculum
            </Link>

            {isSignedIn && (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-2.5 rounded-lg text-sm font-semibold text-[var(--fg)] hover:bg-[var(--overlay-8)]"
              >
                <LayoutDashboard className="w-4 h-4 text-amber-500" />
                My Dashboard
              </Link>
            )}

            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 p-2.5 rounded-lg text-sm font-semibold text-[var(--fg)] hover:bg-[var(--overlay-8)]"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Free Access
            </Link>

            <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-col gap-2">
              {!isSignedIn ? (
                <>
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                    <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                      Start Free
                    </Link>
                  </Button>
                </>
              ) : (
                <Button
                  variant="destructive"
                  className="w-full justify-center text-xs"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
