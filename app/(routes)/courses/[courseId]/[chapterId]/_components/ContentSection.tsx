"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { CourseExercise } from "../[exerciseslug]/page";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BookText,
  Target,
  Lightbulb,
  Star,
  Sparkles,
  Bot,
  Loader2,
  RefreshCw,
  HelpCircle,
  Code,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DOMPurify from "dompurify";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};

type Tab = "description" | "task" | "hint" | "ai";

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "description", label: "Description", icon: <BookText className="w-3.5 h-3.5" /> },
  { id: "task", label: "Task", icon: <Target className="w-3.5 h-3.5 text-sky-400" /> },
  { id: "hint", label: "Hint", icon: <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> },
  { id: "ai", label: "Gemini AI", icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" /> },
];

function cleanHtml(raw?: string): string {
  if (!raw) return "";
  const cleaned = raw
    .replace(/<\/?(?:body|html|head)[^>]*>/gi, "")
    .replace(/style\s*=\s*(?:'[^']*'|"[^"]*")/gi, ""); // strip conflicting body styles
  return typeof window !== "undefined" ? DOMPurify.sanitize(cleaned) : cleaned;
}

const proseClasses = `
  prose prose-sm max-w-none leading-relaxed
  [&>h1]:text-white [&>h1]:font-bold [&>h1]:text-xl [&>h1]:mt-4 [&>h1]:mb-2.5
  [&>h2]:text-white [&>h2]:font-semibold [&>h2]:text-base [&>h2]:mt-3.5 [&>h2]:mb-2
  [&>h3]:text-white/90 [&>h3]:font-semibold [&>h3]:mt-3 [&>h3]:mb-1.5
  [&>p]:text-white/70 [&>p]:leading-7 [&>p]:mb-3 [&>p]:text-sm
  [&>ul]:text-white/70 [&>ul]:space-y-1.5 [&>ul]:pl-5 [&>ul]:mb-3 [&>ul]:text-sm
  [&>ol]:text-white/70 [&>ol]:space-y-1.5 [&>ol]:pl-5 [&>ol]:mb-3 [&>ol]:text-sm
  [&>li]:text-white/70
  [&>pre]:bg-[#1e1e2e] [&>pre]:rounded-lg [&>pre]:p-4 [&>pre]:border [&>pre]:border-white/10 [&>pre]:overflow-x-auto [&>pre]:mb-3 [&>pre]:text-sm
  [&>code]:text-amber-400 [&>code]:bg-amber-400/10 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded [&>code]:text-xs [&>code]:font-mono
  [&_pre_code]:text-white/80 [&_pre_code]:bg-transparent [&_pre_code]:p-0
  [&>blockquote]:border-l-4 [&>blockquote]:border-amber-400/40 [&>blockquote]:pl-4 [&>blockquote]:text-white/50 [&>blockquote]:italic [&>blockquote]:mb-3
  [&>strong]:text-white [&>strong]:font-semibold
`;

export default function ContentSection({ courseExerciseData, loading }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const { exerciseslug } = useParams();
  const contentInfo = courseExerciseData?.ExerciseData;

  // AI Hint state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [aiSource, setAiSource] = useState<string>("");

  const currentExercise = courseExerciseData?.exercises?.find(
    (e) => e.slug === exerciseslug
  );

  const requestAiHint = async (type: "hint" | "debug" | "explain" = "hint") => {
    setAiLoading(true);
    try {
      const res = await axios.post("/api/ai/hint", {

        exerciseName: contentInfo?.exerciseName,
        task: contentInfo?.exerciseContent?.task,
        content: contentInfo?.exerciseContent?.content,
        language: courseExerciseData?.editorType,
        requestType: type,
      });

      if (res.data?.hint) {
        setAiHint(res.data.hint);
        setAiSource(res.data.source || "gemini");
      }
    } catch (err: any) {
      toast.error("Failed to connect to AI mentor. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "#141414" }}>
      {/* ── Tab bar ── */}
      <div
        className="shrink-0 flex items-center border-b px-2 gap-1"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "#1a1a1a" }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.id === "ai" && !aiHint && !aiLoading) {
                requestAiHint("hint");
              }
            }}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors cursor-pointer",
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
            </div>
          ) : (
            <>
              {/* ── DESCRIPTION TAB ── */}
              {activeTab === "description" && (
                <div className="space-y-5">
                  {/* Problem title */}
                  <div>
                    <h1 className="text-xl font-bold text-white mb-2 leading-snug">
                      {contentInfo?.exerciseName}
                    </h1>

                    {/* XP + difficulty row */}
                    {currentExercise && (
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className={cn(
                            "text-xs font-semibold px-2 py-0.5 rounded-full",
                            currentExercise.difficulty === "Hard"
                              ? "bg-rose-400/15 text-rose-400 border border-rose-400/25"
                              : currentExercise.difficulty === "Medium"
                              ? "bg-amber-400/15 text-amber-400 border border-amber-400/25"
                              : "bg-emerald-400/15 text-emerald-400 border border-emerald-400/25"
                          )}
                        >
                          {currentExercise.difficulty ?? "Easy"}
                        </span>
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-amber-400 font-semibold font-mono">
                            {currentExercise.xp} XP
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Clean Content HTML */}
                  {contentInfo?.exerciseContent?.content ? (
                    <div
                      className={proseClasses}
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(contentInfo.exerciseContent.content),
                      }}
                    />
                  ) : (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
                      <p className="text-sm font-semibold text-white/90">
                        Interactive Coding Challenge
                      </p>
                      <p className="text-xs text-white/60 leading-relaxed">
                        Implement your solution in the editor on the right according to the task criteria. Run your code to test in sandbox, then submit to earn XP.
                      </p>
                    </div>
                  )}

                  {/* Bottom Quick-Task Preview */}
                  {contentInfo?.exerciseContent?.task && (
                    <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 space-y-2 mt-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                        <Target className="w-4 h-4" /> Challenge Objective
                      </div>
                      <div
                        className="text-xs text-slate-300 leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: cleanHtml(contentInfo.exerciseContent.task),
                        }}
                      />
                      <button
                        onClick={() => setActiveTab("task")}
                        className="text-[11px] font-semibold text-sky-400 hover:underline pt-1 inline-block cursor-pointer"
                      >
                        View Full Task Specifications →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── TASK TAB ── */}
              {activeTab === "task" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <div className="w-7 h-7 rounded-lg bg-sky-400/15 flex items-center justify-center">
                      <Target className="w-4 h-4 text-sky-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">Your Challenge Task</h2>
                      <p className="text-xs text-white/50">Follow these specifications carefully</p>
                    </div>
                  </div>

                  {contentInfo?.exerciseContent?.task ? (
                    <div
                      className={cn(
                        "p-4 rounded-xl border border-white/10 bg-white/5",
                        proseClasses
                      )}
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(contentInfo.exerciseContent.task),
                      }}
                    />
                  ) : (
                    <p className="text-sm text-white/30 italic">No specific task instructions configured.</p>
                  )}

                  {/* Direct AI Hint Callout */}
                  <div className="p-4 rounded-xl border border-purple-500/25 bg-purple-500/10 flex items-center justify-between gap-4 mt-6">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Need guidance on this task?
                      </div>
                      <p className="text-[11px] text-white/60">
                        Ask Gemini AI to explain the requirements or provide a step-by-step hint.
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setActiveTab("ai");
                        if (!aiHint) requestAiHint("hint");
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs h-8 px-3 rounded-lg shrink-0 cursor-pointer"
                    >
                      Ask Gemini
                    </Button>
                  </div>
                </div>
              )}

              {/* ── HINT TAB ── */}
              {activeTab === "hint" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/15 flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white">Curriculum Hint</h2>
                      <p className="text-xs text-white/50">Official hint provided for this lesson</p>
                    </div>
                  </div>

                  {contentInfo?.exerciseContent?.hint ? (
                    <div
                      className={cn(
                        "p-4 rounded-xl border border-amber-400/20 bg-amber-500/5",
                        proseClasses
                      )}
                      dangerouslySetInnerHTML={{
                        __html: cleanHtml(contentInfo.exerciseContent.hint),
                      }}
                    />
                  ) : (
                    <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white/50 italic">
                      No static hint configured. Click Gemini AI for an interactive dynamic hint!
                    </div>
                  )}

                  {/* Ask Gemini button */}
                  <Button
                    size="sm"
                    onClick={() => {
                      setActiveTab("ai");
                      requestAiHint("hint");
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs h-9 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" /> Ask Google Gemini AI for an Additional Hint
                  </Button>
                </div>
              )}

              {/* ── GEMINI AI MENTOR TAB ── */}
              {activeTab === "ai" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-white flex items-center gap-2">
                          Google Gemini AI Mentor
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                            {aiSource === "gemini-api" ? "Gemini 1.5 Flash" : "AI Mentor Active"}
                          </span>
                        </h2>
                        <p className="text-xs text-white/50">
                          Socratic learning: hints, debugging, and concept deep-dives
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => requestAiHint("hint")}
                      disabled={aiLoading}
                      className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title="Regenerate"
                    >
                      <RefreshCw className={cn("w-4 h-4", aiLoading && "animate-spin")} />
                    </button>
                  </div>

                  {/* Mode selector pills */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => requestAiHint("hint")}
                      disabled={aiLoading}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer bg-white/5 border-white/10 hover:border-purple-400/50 hover:bg-purple-500/10 text-slate-200"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>Socratic Clue</span>
                    </button>
                    <button
                      onClick={() => requestAiHint("debug")}
                      disabled={aiLoading}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer bg-white/5 border-white/10 hover:border-purple-400/50 hover:bg-purple-500/10 text-slate-200"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
                      <span>Spot Pitfalls</span>
                    </button>
                    <button
                      onClick={() => requestAiHint("explain")}
                      disabled={aiLoading}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer bg-white/5 border-white/10 hover:border-purple-400/50 hover:bg-purple-500/10 text-slate-200"
                    >
                      <BookText className="w-3.5 h-3.5 text-sky-400" />
                      <span>Concept Dive</span>
                    </button>
                  </div>

                  {/* Loading State */}
                  {aiLoading && (
                    <div className="p-8 rounded-xl border border-purple-500/20 bg-purple-500/5 text-center space-y-3">
                      <Loader2 className="w-6 h-6 text-purple-400 animate-spin mx-auto" />
                      <p className="text-xs text-slate-300 font-medium">
                        Consulting Google Gemini to craft personalized coaching advice...
                      </p>
                    </div>
                  )}

                  {/* AI Response Display */}
                  {!aiLoading && aiHint && (
                    <div className="p-4 rounded-xl border border-purple-500/25 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 space-y-3">
                      <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                        {aiHint}
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40">
                        <span>Powered by Google Gemini 1.5 Flash</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => requestAiHint("debug")}
                            className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer"
                          >
                            Explain Pitfalls →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {!aiLoading && !aiHint && (
                    <div className="p-6 rounded-xl border border-white/10 bg-white/5 text-center space-y-3">
                      <Bot className="w-8 h-8 text-purple-400 mx-auto" />
                      <p className="text-xs text-white/60">
                        Stuck on a tricky step or unsure what the task requires?
                      </p>
                      <Button
                        size="sm"
                        onClick={() => requestAiHint("hint")}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 rounded-lg cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Generate Gemini Hint
                      </Button>
                    </div>
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
