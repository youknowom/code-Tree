"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";
import { Course } from "../(routes)/courses/_components/CourseList";
import { BookOpen, ChevronDown, Menu, X, LayoutDashboard, Tag, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { user, isSignedIn, isLoaded } = useUser();
  const path = usePathname();
  const { exerciseslug } = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);

  useEffect(() => {
    GetCourses();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const GetCourses = async () => {
    const result = await axios.get("/api/course");
    setCourses(result.data);
  };

  const navLinks = [
    { href: "/pricing", label: "Pricing", icon: <Tag className="w-4 h-4" /> },
    { href: "/contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  ];

  // Exercise pages have their own built-in top bar
  if (exerciseslug) return null;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b bg-[var(--bg-page)]/95 backdrop-blur-xl shadow-sm border-[var(--border-default)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-[var(--border-default)] group-hover:ring-amber-400/50 transition-all duration-300 group-hover:scale-105">
              <Image src="/logo.png" alt="logo" fill className="object-contain p-0.5" />
            </div>
            <span className="font-bold text-xl tracking-tight gradient-text-brand hidden sm:block">
              CodeTree
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCoursesDropdownOpen(true)}
              onMouseLeave={() => setCoursesDropdownOpen(false)}
            >
              <Link href="/courses" className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--overlay-6)] transition-all duration-200">
                <BookOpen className="w-4 h-4" />
                Courses
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", coursesDropdownOpen && "rotate-180")} />
              </Link>

              {/* Dropdown — pt-2 invisible bridge to prevent mouse-leave gap */}
              <div
                className={cn(
                  "absolute top-full left-0 w-[520px] pt-1.5",
                  coursesDropdownOpen ? "block" : "hidden"
                )}
              >
                <div className="rounded-2xl border bg-[var(--bg-card)] shadow-2xl overflow-hidden animate-fade-in-up border-[var(--border-default)]">
                  <div className="p-3 grid grid-cols-2 gap-1 max-h-[380px] overflow-y-auto">
                    {courses.map((course) => (
                      <Link
                        key={course.courseId}
                        href={"/courses/" + course.courseId}
                        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--overlay-6)] transition-all duration-200"
                      >
                        <div className="shrink-0 w-9 h-9 rounded-lg bg-amber-400/10 flex items-center justify-center ring-1 ring-amber-400/20 group-hover:ring-amber-400/40 transition-colors mt-0.5">
                          <BookOpen className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[var(--fg)] group-hover:text-amber-500 dark:group-hover:text-amber-400 truncate transition-colors">
                            {course.title}
                          </p>
                          <p className="text-xs text-[var(--fg-subtle)] line-clamp-1 mt-0.5">
                            {course.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-[var(--border-subtle)] p-3">
                    <Link
                      href="/courses"
                      className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                      View all courses
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  path === link.href
                    ? "text-[var(--fg)] bg-[var(--overlay-8)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--overlay-6)]"
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth skeleton while Clerk loads */}
            {!isLoaded ? (
              <div className="w-8 h-8 rounded-full bg-[var(--overlay-8)] animate-pulse" />
            ) : !isSignedIn ? (
              <div className="flex items-center gap-2 ml-1">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--overlay-8)] font-medium"
                >
                  <Link href="/sign-in">Sign in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="gradient-brand text-[oklch(0.1_0.005_264)] font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-amber-400/20 border-0"
                >
                  <Link href="/sign-up">Get started</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-1">
                <Button
                  asChild
                  size="sm"
                  className="hidden sm:flex gradient-brand text-[oklch(0.1_0.005_264)] font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-amber-400/20 border-0"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="w-4 h-4 mr-1.5" />
                    Dashboard
                  </Link>
                </Button>
                <div className="ring-2 ring-[var(--border-default)] hover:ring-amber-400/40 rounded-full transition-all duration-300">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[var(--overlay-8)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden bg-[var(--bg-page)]/97 backdrop-blur-xl border-t border-[var(--border-default)]">
          <nav className="p-4 space-y-1">
            {courses.slice(0, 6).map((course) => (
              <Link
                key={course.courseId}
                href={"/courses/" + course.courseId}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--overlay-6)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">{course.title}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-[var(--border-subtle)] space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--overlay-6)] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                </Link>
              ))}
            </div>
            {user && (
              <div className="pt-2 border-t border-[var(--border-subtle)]">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 p-3 rounded-xl bg-amber-400/10 text-amber-500 dark:text-amber-400 hover:bg-amber-400/15 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-sm font-semibold">Dashboard</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
