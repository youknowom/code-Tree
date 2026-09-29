"use client";

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
  CheckCircle2,
  BookOpen,
  Star,
  Play,
  ChevronRight,
  Code2,
  Check,
  Circle,
  HelpCircle,
  Award,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import AssessmentModal from "@/components/AssessmentModal";

type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
  refreshData: () => void;
};

export default function CourseChapter({
  loading,
  courseDetail,
  refreshData,
}: Props) {
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [assessmentLoading, setAssessmentLoading] = useState(false);
  const [assessmentQuestions, setAssessmentQuestions] = useState<any[]>([]);

  const isExerciseCompleted = (chapterId: number, exerciseIndex: number) => {
    return !!courseDetail?.completedExcercises?.some(
      (item) =>
        item.chapterId === chapterId && item.exerciseId === exerciseIndex
    );
  };

  const handleOpenAssessment = async () => {
    if (!courseDetail?.courseId) return;
    setAssessmentLoading(true);
    try {
      const res = await axios.get(
        `/api/assessment?courseId=${courseDetail.courseId}`
      );
      if (res.data?.questions && res.data.questions.length > 0) {
        setAssessmentQuestions(res.data.questions);
        setAssessmentModalOpen(true);
      } else {
        toast.error("No assessment configured for this course yet.");
      }
    } catch (err: any) {
      toast.error(
        err.response?.data?.error || "Failed to load course assessment."
      );
    } finally {
      setAssessmentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] space-y-3"
          >
            <Skeleton className="h-5 w-48 rounded-md" />
            <Skeleton className="h-3 w-64 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  const totalExercises =
    courseDetail?.chapters?.reduce(
      (acc, ch) => acc + (ch.exercises?.length || 0),
      0
    ) || 0;

  const totalCompleted = courseDetail?.completedExcercises?.length || 0;
  const certificate = courseDetail?.certificate;
  const assessment = courseDetail?.assessment;

  return (
    <div className="space-y-6">
      {/* Syllabus Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--border-default)] gap-2">
        <div>
          <h2 className="text-xl font-bold text-[var(--fg)] tracking-tight">
            Curriculum Syllabus
          </h2>
          <p className="text-xs text-[var(--fg-muted)] mt-0.5">
            {courseDetail?.chapters?.length || 0} modules · {totalExercises} interactive lessons
          </p>
        </div>

        {totalExercises > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[var(--fg-subtle)]">
              Overall Track Progress:
            </span>
            <span className="text-xs font-bold text-amber-500 font-mono px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              {totalCompleted} / {totalExercises} Solved
            </span>
          </div>
        )}
      </div>

      {/* Chapters Accordion */}
      <Accordion
        type="single"
        collapsible
        defaultValue="item-0"
        className="space-y-3"
      >
        {courseDetail?.chapters?.map((chapter, index) => {
          const completedCount =
            chapter?.exercises?.filter((_, eIdx) =>
              isExerciseCompleted(chapter.id, eIdx)
            ).length || 0;

          const isChapterComplete =
            (chapter?.exercises?.length || 0) > 0 &&
            completedCount === chapter?.exercises?.length;

          return (
            <AccordionItem
              value={`item-${index}`}
              key={chapter.id ?? index}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden transition-all duration-200"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-[var(--bg-elevated)]/50 transition-colors">
                <div className="flex items-center gap-3 text-left w-full pr-2">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold font-mono transition-colors",
                      isChapterComplete
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-[var(--bg-elevated)] text-[var(--fg-subtle)] border border-[var(--border-default)]"
                    )}
                  >
                    {isChapterComplete ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[var(--fg)] truncate">
                        {chapter.name}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--fg-muted)] line-clamp-1 mt-0.5 font-normal">
                      {chapter.description}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-[var(--fg-subtle)] shrink-0 font-medium ml-2">
                    {completedCount} / {chapter.exercises?.length || 0}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pt-0 pb-3 px-5 border-t border-[var(--border-subtle)]">
                <div className="space-y-2 pt-3">
                  {chapter.exercises?.map((exc, indexExc) => {
                    const completed = isExerciseCompleted(chapter.id, indexExc);
                    const exerciseUrl = `/courses/${courseDetail.courseId}/${chapter.chapterId}/${exc.slug}`;

                    return (
                      <div
                        key={exc.slug ?? indexExc}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl border transition-all duration-150 gap-3",
                          completed
                            ? "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30"
                            : "border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30 hover:bg-[var(--bg-elevated)] hover:border-[var(--border-default)]"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="shrink-0">
                            {completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-[var(--border-default)] flex items-center justify-center text-[var(--fg-subtle)] text-[10px]">
                                •
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-[var(--fg-subtle)]">
                                #{String(indexExc + 1).padStart(2, "0")}
                              </span>
                              <p className="text-xs sm:text-sm font-semibold text-[var(--fg)] truncate">
                                {exc.name}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[11px] text-amber-500 font-medium flex items-center gap-1 font-mono">
                                <Star className="w-3 h-3 fill-amber-500/30" />
                                +{exc.xp || 20} XP
                              </span>
                              <span className="text-[10px] uppercase font-bold text-[var(--fg-subtle)] bg-[var(--overlay-8)] px-1.5 py-0.5 rounded-sm">
                                {exc.difficulty || "easy"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Action Button */}
                        <div className="shrink-0">
                          {completed ? (
                            <Link href={exerciseUrl}>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10 text-xs font-semibold h-8 px-3 rounded-lg cursor-pointer"
                              >
                                Review <ChevronRight className="w-3.5 h-3.5 ml-1" />
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              asChild
                              size="sm"
                              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-8 px-3.5 rounded-lg cursor-pointer shadow-xs"
                            >
                              <Link href={exerciseUrl}>
                                Solve Challenge <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* ── FINAL CERTIFICATION ASSESSMENT MODULE ── */}
      {assessment && (
        <div className="rounded-2xl border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-[var(--bg-card)] to-[var(--bg-card)] p-6 sm:p-7 shadow-lg relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30">
                    FINAL CAPSTONE
                  </span>
                  {certificate && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> CERTIFIED
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[var(--fg)] tracking-tight">
                  {assessment.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed max-w-xl">
                  {assessment.description ||
                    "Demonstrate practical competence across all course topics to earn your verified certificate."}
                </p>
                <div className="text-xs text-[var(--fg-subtle)] font-medium pt-1">
                  Passing Score:{" "}
                  <span className="font-mono font-bold text-amber-400">
                    {assessment.passingScore}%
                  </span>{" "}
                  · Timed: {assessment.timeLimitMinutes || 30} mins · Automated server verification
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 sm:pt-0">
              {certificate ? (
                <>
                  <Link
                    href={`/verify/${certificate.certificateId}`}
                    target="_blank"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-colors shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4" /> View Certificate
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={assessmentLoading}
                    onClick={handleOpenAssessment}
                    className="text-xs font-semibold border-[var(--border-default)] cursor-pointer"
                  >
                    Retake Exam
                  </Button>
                </>
              ) : (
                <Button
                  disabled={assessmentLoading}
                  onClick={handleOpenAssessment}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {assessmentLoading ? "Loading Exam..." : "Start Certification Exam"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Assessment Modal */}
      {assessment && (
        <AssessmentModal
          isOpen={assessmentModalOpen}
          onClose={() => setAssessmentModalOpen(false)}
          courseId={courseDetail.courseId}
          courseTitle={courseDetail.title}
          assessmentTitle={assessment.title}
          passingScore={assessment.passingScore || 70}
          questions={assessmentQuestions}
          onSuccess={() => {
            refreshData();
          }}
        />
      )}
    </div>
  );
}
