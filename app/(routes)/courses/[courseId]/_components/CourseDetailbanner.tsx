"use client";

import React, { useState } from "react";
import { Course } from "../../_components/CourseList";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Loader2Icon,
  PlayCircle,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Layers,
  Terminal,
  Code2,
  Award,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CourseIcon from "@/components/CourseIcon";

type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
  refreshData: () => void;
};

const levelStyles: Record<string, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-500 border-rose-500/20",
};

export default function CourseDetailbanner({
  loading,
  courseDetail,
  refreshData,
}: Props) {
  const [enrollLoading, setEnrollLoading] = useState(false);

  if (loading) {
    return (
      <div className="border-b border-[var(--border-default)] bg-[var(--bg-elevated)]/40 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-10 w-96 rounded-xl" />
          <Skeleton className="h-5 w-2/3 rounded-lg" />
          <div className="flex gap-4 pt-2">
            <Skeleton className="h-10 w-36 rounded-xl" />
            <Skeleton className="h-10 w-36 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!courseDetail) return null;

  const handleEnroll = async () => {
    setEnrollLoading(true);
    try {
      await axios.post("/api/enroll-course", {
        courseId: courseDetail?.courseId,
      });
      toast.success("Enrolled successfully! Ready to start practice 🎉");
      refreshData();
    } catch {
      toast.error("Failed to enroll. Please sign in or try again.");
    } finally {
      setEnrollLoading(false);
    }
  };

  const totalExercises =
    courseDetail.chapters?.reduce(
      (acc, ch) => acc + (ch.exercises?.length || 0),
      0
    ) || 0;

  const totalXp =
    courseDetail.chapters?.reduce(
      (acc, ch) =>
        acc +
        (ch.exercises?.reduce((xAcc, ex) => xAcc + (ex.xp || 0), 0) || 0),
      0
    ) || 0;

  const firstChapter = courseDetail.chapters?.[0];
  const firstExercise = firstChapter?.exercises?.[0];
  const firstExerciseLink =
    firstChapter && firstExercise
      ? `/courses/${courseDetail.courseId}/${firstChapter.chapterId}/${firstExercise.slug}`
      : `/courses/${courseDetail.courseId}`;

  return (
    <div className="border-b border-[var(--border-default)] bg-[var(--bg-elevated)]/30 relative overflow-hidden">
      {/* Subtle Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(var(--border-default) 1px, transparent 1px), linear-gradient(to right, var(--border-default) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="absolute -top-24 right-0 w-[500px] h-[300px] rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.76 0.18 85) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--fg-subtle)] mb-5">
          <Link
            href="/courses"
            className="hover:text-[var(--fg)] transition-colors"
          >
            Curriculum Tracks
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-[var(--fg-muted)] font-medium truncate max-w-xs">
            {courseDetail.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Track Details */}
          <div className="lg:col-span-8 space-y-4">
            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] shadow-xs">
                <CourseIcon tag={courseDetail.tags || courseDetail.title} size={18} />
                <span className="text-xs font-bold text-[var(--fg)]">
                  {courseDetail.tags || "Core Track"}
                </span>
              </div>

              {courseDetail.level && (
                <span
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-semibold border",
                    levelStyles[courseDetail.level] ?? levelStyles.Beginner
                  )}
                >
                  {courseDetail.level} Level
                </span>
              )}

              {courseDetail.duration && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-medium text-[var(--fg-subtle)] bg-[var(--bg-card)] border border-[var(--border-default)]">
                  ⏱ {courseDetail.duration}
                </span>
              )}

              {courseDetail.certificateEnabled !== false && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/25 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> Verified Certificate
                </span>
              )}

              <span className="px-2.5 py-1 rounded-lg text-xs font-medium text-[var(--fg-subtle)] bg-[var(--bg-card)] border border-[var(--border-default)]">
                {courseDetail.editorType === "python"
                  ? "Python / Pyodide"
                  : courseDetail.editorType === "vanilla-ts"
                  ? "TypeScript Sandbox"
                  : courseDetail.editorType === "react"
                  ? "React 19 Sandbox"
                  : courseDetail.editorType === "static"
                  ? "HTML / CSS Preview"
                  : "Node / JavaScript"}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--fg)] leading-tight">
              {courseDetail.title}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[var(--fg-muted)] leading-relaxed max-w-2xl font-normal">
              {courseDetail.description}
            </p>

            {/* Instructor credit */}
            {courseDetail.instructor && (
              <div className="text-xs text-[var(--fg-muted)] font-medium">
                Taught by <span className="font-semibold text-[var(--fg)]">{courseDetail.instructor}</span>
              </div>
            )}

            {/* Track Metrics Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-[var(--fg-subtle)] font-medium">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-[var(--fg)]">
                  {courseDetail.chapters?.length || 0}
                </span>{" "}
                Chapters
              </div>

              <div className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-sky-400" />
                <span className="font-semibold text-[var(--fg)]">
                  {totalExercises}
                </span>{" "}
                Challenges
              </div>

              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-[var(--fg)]">
                  +{totalXp} XP
                </span>{" "}
                to Earn
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              {courseDetail.certificate && (
                <Button
                  asChild
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm h-11 px-6 rounded-xl shadow-md cursor-pointer border border-emerald-400/30"
                >
                  <Link href={`/verify/${courseDetail.certificate.certificateId}`} target="_blank">
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    View Certificate
                  </Link>
                </Button>
              )}

              {courseDetail.userEnrolled ? (
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm h-11 px-6 rounded-xl shadow-md cursor-pointer border border-amber-400/30"
                >
                  <Link href={firstExerciseLink}>
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Continue Track
                  </Link>
                </Button>
              ) : (
                <Button
                  onClick={handleEnroll}
                  disabled={enrollLoading}
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm h-11 px-6 rounded-xl shadow-md cursor-pointer border border-amber-400/30 disabled:opacity-60"
                >
                  {enrollLoading ? (
                    <>
                      <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Enroll in Track (100% Free)
                    </>
                  )}
                </Button>
              )}

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[var(--border-default)] hover:bg-[var(--overlay-6)] text-[var(--fg)] text-sm h-11 px-5 rounded-xl cursor-pointer"
              >
                <Link href="/courses">Browse Other Tracks</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Code Card Badge (No AI images!) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-2">
                  <CourseIcon
                    tag={courseDetail.tags || courseDetail.title}
                    size={32}
                  />
                  <div>
                    <h3 className="font-bold text-sm text-[var(--fg)]">
                      Interactive Syllabus
                    </h3>
                    <p className="text-[11px] text-[var(--fg-subtle)]">
                      Automated In-Browser Tests
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase">
                  Verified
                </span>
              </div>

              {/* Code Preview Terminal Box */}
              <div className="rounded-xl bg-[#090a0d] p-3.5 font-mono text-[11px] text-slate-300 border border-slate-800 space-y-1">
                <p className="text-slate-500">// Track Environment</p>
                <p>
                  <span className="text-amber-400">const</span> track = {"{"}
                </p>
                <p className="pl-3">
                  title: <span className="text-emerald-400">&quot;{courseDetail.title}&quot;</span>,
                </p>
                <p className="pl-3">
                  level: <span className="text-emerald-400">&quot;{courseDetail.level}&quot;</span>,
                </p>
                <p className="pl-3">
                  challenges: <span className="text-sky-400">{totalExercises}</span>,
                </p>
                <p className="pl-3">
                  xpReward: <span className="text-amber-400">+{totalXp}</span>,
                </p>
                <p>{"}"};</p>
              </div>

              <div className="text-[11px] text-[var(--fg-subtle)] flex items-center justify-between pt-1">
                <span>Free forever access</span>
                <span className="font-semibold text-amber-500">Zero Paywalls</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
