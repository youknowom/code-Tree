"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { CourseExercise } from "../[exerciseslug]/page";
import { Skeleton } from "@/components/ui/skeleton";
import { BookText, Target, Lightbulb, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};

type Tab = "description" | "task" | "hint";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "description", label: "Description", icon: <BookText className="w-3.5 h-3.5" /> },
  { id: "task", label: "Task", icon: <Target className="w-3.5 h-3.5" /> },
  { id: "hint", label: "Hint", icon: <Lightbulb className="w-3.5 h-3.5" /> },
];

const proseClasses = `
  prose prose-sm max-w-none leading-relaxed
  [&>h1]:text-white [&>h1]:font-bold [&>h1]:text-xl [&>h1]:mt-5 [&>h1]:mb-3
  [&>h2]:text-white [&>h2]:font-semibold [&>h2]:text-base [&>h2]:mt-4 [&>h2]:mb-2
  [&>h3]:text-white/90 [&>h3]:font-semibold [&>h3]:mt-3 [&>h3]:mb-1.5
  [&>p]:text-white/65 [&>p]:leading-7 [&>p]:mb-3 [&>p]:text-sm
  [&>ul]:text-white/65 [&>ul]:space-y-1.5 [&>ul]:pl-5 [&>ul]:mb-3 [&>ul]:text-sm
  [&>ol]:text-white/65 [&>ol]:space-y-1.5 [&>ol]:pl-5 [&>ol]:mb-3 [&>ol]:text-sm
  [&>li]:text-white/65
  [&>pre]:bg-[#1e1e2e] [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:border [&>pre]:border-white/8 [&>pre]:overflow-x-auto [&>pre]:mb-3 [&>pre]:text-sm
  [&>code]:text-amber-400 [&>code]:bg-amber-400/10 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs [&>code]:font-mono
  [&_pre_code]:text-white/80 [&_pre_code]:bg-transparent [&_pre_code]:p-0
  [&>blockquote]:border-l-4 [&>blockquote]:border-amber-400/40 [&>blockquote]:pl-4 [&>blockquote]:text-white/50 [&>blockquote]:italic [&>blockquote]:mb-3
  [&>strong]:text-white [&>strong]:font-semibold
`;

function ContentSection({ courseExerciseData, loading }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const { exerciseslug } = useParams();
  const contentInfo = courseExerciseData?.ExerciseData;
  // Find the current exercise by slug for difficulty/XP display
  const currentExercise = courseExerciseData?.exercises?.find(
    (e) => e.slug === exerciseslug
  );

  return (
    <div className="h-full flex flex-col" style={{ background: "#141414" }}>
      {/* ── Tab bar ── */}
      <div
        className="shrink-0 flex items-center border-b px-2"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "#1a1a1a" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-amber-400 text-white"
                : "border-transparent text-white/40 hover:text-white/70"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="p-5 pb-12">
          {loading || !contentInfo ? (
            /* Skeleton */
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4 rounded-lg shimmer" />
              <Skeleton className="h-4 w-1/4 rounded shimmer" />
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full rounded shimmer" />
                <Skeleton className="h-4 w-5/6 rounded shimmer" />
                <Skeleton className="h-4 w-4/5 rounded shimmer" />
                <Skeleton className="h-4 w-full rounded shimmer" />
              </div>
              <Skeleton className="h-24 w-full rounded-lg shimmer" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded shimmer" />
                <Skeleton className="h-4 w-3/4 rounded shimmer" />
              </div>
            </div>
          ) : (
            <>
              {/* ── DESCRIPTION TAB ── */}
              {activeTab === "description" && (
                <div>
                  {/* Problem title */}
                  <h1 className="text-xl font-bold text-white mb-3 leading-snug">
                    {contentInfo?.exerciseName}
                  </h1>

                  {/* XP + difficulty row */}
                  {currentExercise && (
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded-full",
                          currentExercise.difficulty === "Hard"
                            ? "bg-rose-400/15 text-rose-400"
                            : currentExercise.difficulty === "Medium"
                              ? "bg-amber-400/15 text-amber-400"
                              : "bg-emerald-400/15 text-emerald-400"
                        )}
                      >
                        {currentExercise.difficulty ?? "Easy"}
                      </span>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-amber-400 font-semibold">{currentExercise.xp} XP</span>
                      </div>
                    </div>
                  )}


                  {/* Content HTML */}
                  <div
                    className={proseClasses}
                    dangerouslySetInnerHTML={{
                      __html: contentInfo?.exerciseContent?.content ?? "",
                    }}
                  />
                </div>
              )}

              {/* ── TASK TAB ── */}
              {activeTab === "task" && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-sky-400/15 flex items-center justify-center">
                      <Target className="w-4 h-4 text-sky-400" />
                    </div>
                    <h2 className="text-base font-bold text-white">Your Task</h2>
                  </div>

                  {contentInfo?.exerciseContent?.task ? (
                    <div
                      className={proseClasses}
                      dangerouslySetInnerHTML={{
                        __html: contentInfo.exerciseContent.task,
                      }}
                    />
                  ) : (
                    <p className="text-sm text-white/30 italic">No task defined for this exercise.</p>
                  )}
                </div>
              )}

              {/* ── HINT TAB ── */}
              {activeTab === "hint" && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/15 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                    </div>
                    <h2 className="text-base font-bold text-white">Hint</h2>
                    {contentInfo?.exerciseContent?.hintXp && (
                      <span className="text-xs text-white/35 ml-auto">
                        -{contentInfo.exerciseContent.hintXp} XP to reveal
                      </span>
                    )}
                  </div>

                  {contentInfo?.exerciseContent?.hint ? (
                    <div
                      className={cn(
                        "p-4 rounded-xl border border-amber-400/15",
                        proseClasses
                      )}
                      style={{ background: "rgba(251,191,36,0.04)" }}
                      dangerouslySetInnerHTML={{
                        __html: contentInfo.exerciseContent.hint,
                      }}
                    />
                  ) : (
                    <p className="text-sm text-white/30 italic">No hint available.</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContentSection;
