import React from "react";
import { EnrolledCourseInfo } from "./EnrolledCourses";
import Link from "next/link";
import { Star, ChevronRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import CourseIcon from "@/components/CourseIcon";

type Props = { courses: EnrolledCourseInfo };

const levelColors: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    border: "border-emerald-500/20",
  },
  Intermediate: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    border: "border-amber-500/20",
  },
  Advanced: {
    bg: "bg-rose-500/10",
    text: "text-rose-500",
    border: "border-rose-500/20",
  },
};

export default function CourseProgressCard({ courses }: Props) {
  const progress = courses?.totalExercises
    ? Math.round((courses.completedExercises / courses.totalExercises) * 100)
    : 0;

  const levelStyle = levelColors[courses?.level] ?? levelColors.Beginner;

  return (
    <Link
      href={"/courses/" + courses?.courseId}
      className="flex flex-col justify-between group rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5 hover:border-amber-500/40 hover:shadow-md transition-all cursor-pointer"
    >
      <div>
        {/* Header with Icon + Progress % */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <CourseIcon tag={courses?.title} size={36} />

          <div className="flex items-center gap-2">
            {(courses as any)?.certificate && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Certified ✓
              </span>
            )}
            {courses?.level && (
              <span
                className={cn(
                  "px-2 py-0.5 rounded-md text-[10px] font-bold border",
                  levelStyle.bg,
                  levelStyle.text,
                  levelStyle.border
                )}
              >
                {courses.level}
              </span>
            )}
            <span className="text-xs font-bold text-amber-500 font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              {progress}%
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-sm sm:text-base text-[var(--fg)] group-hover:text-amber-500 transition-colors line-clamp-1 mb-1">
          {courses?.title}
        </h3>

        {/* Challenge count */}
        <p className="text-xs text-[var(--fg-subtle)] flex items-center gap-1.5 mb-3 font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          {courses?.completedExercises || 0} of {courses?.totalExercises || 0} Solved
        </p>

        {/* Progress Bar */}
        <div className="h-1.5 rounded-full bg-[var(--bg-elevated)] overflow-hidden border border-[var(--border-subtle)]">
          <div
            className="h-full rounded-full bg-amber-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Card bottom */}
      <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
        <span className="text-[var(--fg-subtle)] flex items-center gap-1 font-mono">
          <Star className="w-3.5 h-3.5 text-amber-500" />
          {courses.xpEarned || 0} XP
        </span>
        <span className="text-amber-500 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 text-xs">
          Continue Solving <ChevronRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
