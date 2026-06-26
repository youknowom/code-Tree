import React, { useState } from "react";
import { Course } from "../../_components/CourseList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { toast } from "sonner";
import { Loader2Icon, Lock, CheckCircle2, BookOpen, Star } from "lucide-react";
import { fireConfetti } from "@/components/ConfettiBlast";
import Link from "next/link";

type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
  refreshData: () => void;
};

function CourseChapter({ loading, courseDetail, refreshData }: Props) {
  const [completingExercise, setCompletingExercise] = useState<string | null>(null);

  const handleCompleteExercise = async (
    chapterId: number,
    exerciseId: number,
    xp: number
  ) => {
    const key = `${chapterId}-${exerciseId}`;
    setCompletingExercise(key);

    try {
      const res = await axios.post("/api/complete-exercise", {
        courseId: courseDetail?.courseId,
        chapterId,
        exerciseId,
        xpEarned: xp,
      });
      const alreadyCompleted = res.data?.alreadyCompleted;

      if (!alreadyCompleted) {
        fireConfetti();
        toast.success(`Exercise completed! +${xp}xp earned!`);
      }

      refreshData();
    } catch (error) {
      toast.error("Failed to complete exercise");
    } finally {
      setCompletingExercise(null);
    }
  };

  const EnableExercise = (currentChapterId: number, currentExerciseId: number) => {
    if (!courseDetail?.userEnrolled) return false;
    if (!courseDetail.chapters) return false;

    const completed = courseDetail?.completedExcercises;

    if (!completed || completed.length === 0) {
      const firstChapter = courseDetail.chapters?.[0];
      return (
        firstChapter &&
        currentChapterId === firstChapter.chapterId &&
        currentExerciseId === 1
      );
    }

    const isAlreadyCompleted = completed.find(
      (item) =>
        item.chapterId === currentChapterId && item.exerciseId === currentExerciseId
    );
    if (isAlreadyCompleted) return true;

    const last = completed[completed.length - 1];
    const lastCompletedChapter = courseDetail.chapters?.find(
      (ch) => ch.chapterId === last.chapterId
    );

    if (!lastCompletedChapter) return false;

    if (currentChapterId === last.chapterId) {
      return currentExerciseId === last.exerciseId + 1;
    }

    if (currentChapterId === last.chapterId + 1) {
      const allPrevCompleted =
        lastCompletedChapter.exercises.length === last.exerciseId;
      return allPrevCompleted && currentExerciseId === 1;
    }

    return false;
  };

  const isExerciseComplted = (chapterId: number, exceriseId: number) => {
    const completeChapterse = courseDetail?.completedExcercises;
    const foundExercise = completeChapterse?.find(
      (item) => item.chapterId == chapterId && item.exerciseId == exceriseId
    );
    return foundExercise ? true : false;
  };

  // Loading state
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-full h-[72px] rounded-2xl shimmer" />
        ))}
      </div>
    );
  }

  // No chapters
  if (!courseDetail?.chapters?.length) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 rounded-2xl border border-white/8 border-dashed bg-[oklch(0.12_0.01_264)] text-center">
        <BookOpen className="w-10 h-10 text-white/20" />
        <p className="text-white/40 text-sm">No chapters available yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/8 bg-[oklch(0.12_0.01_264)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6">
        <div className="w-9 h-9 rounded-xl bg-amber-400/8 border border-amber-400/15 flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <h2 className="font-bold text-white">Course Chapters</h2>
          <p className="text-xs text-white/30">
            {courseDetail.chapters.length} chapters
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible className="divide-y divide-white/6">
        {courseDetail.chapters.map((chapter, index) => (
          <AccordionItem
            key={index}
            value={`chapter-${index}`}
            className="border-0"
          >
            <div className="flex items-center">
              <AccordionTrigger className="flex items-center gap-4 px-5 py-4 hover:bg-white/4 transition-colors w-full text-left [&>svg]:ml-auto [&>svg]:shrink-0">
                {/* Chapter number */}
                <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm gradient-brand text-[oklch(0.1_0.005_264)]">
                  {index + 1}
                </div>

                <div className="flex-1 text-left min-w-0">
                  <span className="font-semibold text-white/90 text-base line-clamp-1">
                    {chapter?.name}
                  </span>
                  <p className="text-xs text-white/30 mt-0.5">
                    {chapter?.exercises?.length || 0} exercises
                  </p>
                </div>
              </AccordionTrigger>
            </div>

            <AccordionContent className="border-t border-white/6">
              <div className="divide-y divide-white/4">
                {chapter?.exercises.map((exc, indexExc) => (
                  <div
                    key={`${chapter.chapterId}-${indexExc}`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/3 transition-colors"
                  >
                    {/* Exercise number */}
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-xs font-bold text-white/40">
                      {indexExc + 1}
                    </div>

                    {/* Exercise info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white/80 truncate">
                        {exc.name}
                      </p>
                      <p className="text-xs text-white/30 mt-0.5 flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400/60" />
                        {exc.xp} XP
                      </p>
                    </div>

                    {/* Action button */}
                    <div className="shrink-0">
                      {isExerciseComplted(chapter?.chapterId, indexExc + 1) ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-xs font-semibold text-emerald-400">Done</span>
                        </div>
                      ) : EnableExercise(chapter?.chapterId, indexExc + 1) ? (
                        <Link
                          href={
                            "/courses/" +
                            courseDetail?.courseId +
                            "/" +
                            chapter?.chapterId +
                            "/" +
                            exc?.slug
                          }
                        >
                          <Button
                            size="sm"
                            className="gradient-brand text-[oklch(0.1_0.005_264)] font-semibold border-0 hover:opacity-90 h-8 px-3 text-xs"
                          >
                            Start · {exc?.xp}xp
                          </Button>
                        </Link>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/4 border border-white/8 text-white/25 cursor-not-allowed">
                              <Lock className="w-3.5 h-3.5" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            className="max-w-[220px] bg-[oklch(0.15_0.01_264)] border-white/10 text-white/80 text-xs"
                            side="left"
                          >
                            {!courseDetail?.userEnrolled
                              ? "Enroll in this course to start learning"
                              : "Complete previous exercises first"}
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default CourseChapter;
