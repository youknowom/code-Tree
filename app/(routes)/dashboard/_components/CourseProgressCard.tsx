import React from "react";
import { EnrolledCourseInfo } from "./EnrolledCourses";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Star, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { courses: EnrolledCourseInfo };

const levelColors: Record<string, { bg: string; text: string; border: string }> = {
  Beginner: { bg: "bg-emerald-400/10", text: "text-emerald-400", border: "border-emerald-400/20" },
  Intermediate: { bg: "bg-amber-400/10", text: "text-amber-400", border: "border-amber-400/20" },
  Advanced: { bg: "bg-rose-400/10", text: "text-rose-400", border: "border-rose-400/20" },
};

function CourseProgressCard({ courses }: Props) {
  const progress = courses?.totalExercises
    ? (courses.completedExercises / courses.totalExercises) * 100
    : 0;

  const levelStyle = levelColors[courses?.level] ?? levelColors.Beginner;

  return (
    <Link href={"/courses/" + courses?.courseId} className="block group">
      <div className="h-full rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden card-hover">
        {/* Course Thumbnail */}
        <div className="relative h-40 overflow-hidden bg-[var(--bg-panel)]">
          <Image
            src={courses?.bannerImage?.trimEnd() || "/cookie.png"}
            alt={courses?.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.01_264)] via-transparent to-transparent opacity-80" />

          {/* Progress pill */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-[var(--border-strong)]">
            <span className="text-xs font-bold text-amber-400">{Math.round(progress)}%</span>
          </div>

          {/* Level badge */}
          {courses?.level && (
            <div className="absolute bottom-3 left-3">
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-semibold border",
                levelStyle.bg, levelStyle.text, levelStyle.border
              )}>
                {courses.level}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3 className="font-bold text-[var(--fg)] group-hover:text-amber-400 transition-colors line-clamp-1">
            {courses?.title}
          </h3>

          {/* Progress */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-[var(--fg-subtle)]">
              <span>Progress</span>
              <span className="font-semibold text-[var(--fg-muted)]">
                {courses?.completedExercises || 0} / {courses?.totalExercises || 0}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
              <div
                className="h-full rounded-full gradient-brand transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* XP Badge */}
          {courses?.xpEarned > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs text-[var(--fg-muted)]">{courses.xpEarned} XP earned</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CourseProgressCard;
