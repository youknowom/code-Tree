"use client";

import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CourseExercise } from "../[exerciseslug]/page";
import { nightOwl } from "@codesandbox/sandpack-themes";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import {
  Play,
  CheckCircle2,
  Loader2,
  Code2,
  Globe,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  loading: boolean;
};

// ── Template normalizer ──
const SANDPACK_TEMPLATES: Record<string, string> = {
  react: "react",
  "react-ts": "react-ts",
  static: "static",
  vanilla: "vanilla",
  "vanilla-ts": "vanilla-ts",
  vue: "vue",
  angular: "angular",
  svelte: "svelte",
  solid: "solid",
  node: "node",
  nextjs: "nextjs",
  html: "static",
  css: "static",
  js: "vanilla",
  javascript: "vanilla",
  typescript: "vanilla-ts",
};

function getSandpackTemplate(editorType?: string): string {
  if (!editorType) return "static";
  return SANDPACK_TEMPLATES[editorType.trim().toLowerCase()] ?? "static";
}

function getLanguageLabel(editorType?: string): string {
  const map: Record<string, string> = {
    static: "HTML / CSS",
    react: "React",
    "react-ts": "React + TS",
    vanilla: "JavaScript",
    "vanilla-ts": "TypeScript",
    vue: "Vue",
    angular: "Angular",
    svelte: "Svelte",
    node: "Node.js",
  };
  const key = getSandpackTemplate(editorType);
  return map[key] ?? editorType ?? "HTML";
}

// ── Code editor toolbar + action buttons ──
const EditorToolbar = ({
  onCompleteExercise,
  IsCompleted,
  langLabel,
}: {
  onCompleteExercise: () => Promise<void>;
  IsCompleted: any;
  langLabel: string;
}) => {
  const { sandpack } = useSandpack();
  const [running, setRunning] = useState(false);
  const [completing, setCompleting] = useState(false);

  const handleRun = async () => {
    setRunning(true);
    sandpack.runSandpack();
    setTimeout(() => setRunning(false), 600);
  };

  const handleComplete = async () => {
    setCompleting(true);
    await onCompleteExercise();
    setCompleting(false);
  };

  return (
    /* Code panel top toolbar */
    <div
      className="shrink-0 h-[42px] flex items-center justify-between px-3 border-b gap-3"
      style={{ borderColor: "rgba(255,255,255,0.07)", background: "#1e1e1e" }}
    >
      {/* Language badge */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold text-white/60"
        style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
        <Code2 className="w-3.5 h-3.5 text-amber-400" />
        {langLabel}
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Run */}
        <button
          onClick={handleRun}
          disabled={running}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all"
          style={{
            borderColor: "rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.75)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
          }}
        >
          {running ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 text-emerald-400" />
          )}
          {running ? "Running…" : "Run"}
        </button>

        {/* Submit / Completed */}
        <button
          onClick={handleComplete}
          disabled={!!IsCompleted || completing}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all",
            IsCompleted
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
              : "border-0 text-[#0d0d0d]"
          )}
          style={
            !IsCompleted
              ? { background: "linear-gradient(135deg, #f0c040 0%, #e0922d 100%)" }
              : {}
          }
        >
          {completing ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5" />
          )}
          {IsCompleted ? "Completed" : "Submit"}
        </button>
      </div>
    </div>
  );
};

// ── Preview panel toolbar ──
const PreviewToolbar = () => {
  const { sandpack } = useSandpack();
  return (
    <div
      className="shrink-0 h-[38px] flex items-center justify-between px-3 border-b border-t"
      style={{ borderColor: "rgba(255,255,255,0.07)", background: "#1a1a1a" }}
    >
      <div className="flex items-center gap-1.5 text-xs text-white/35 font-medium">
        <Globe className="w-3.5 h-3.5" />
        Preview
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => sandpack.resetAllFiles()}
          title="Reset code"
          className="p-1.5 rounded hover:bg-white/8 text-white/30 hover:text-white/70 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

// ── Main CodeEditor ──
function CodeEditor({ courseExerciseData, loading }: Props) {
  const { exerciseslug, chapterId } = useParams();
  const { isSignedIn } = useUser();

  const exerciseIndex = courseExerciseData?.exercises?.findIndex(
    (item) => item.slug === exerciseslug
  ) ?? -1;

  const IsCompleted = courseExerciseData?.completedExercise?.find(
    (item) =>
      item?.courseId === courseExerciseData?.courseId &&
      item?.exerciseId === exerciseIndex + 1
  );

  const onCompleteExercise = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to save your progress.", {
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/sign-in",
        },
      });
      return;
    }
    if (exerciseIndex < 0 || !courseExerciseData) return;
    try {
      const res = await axios.post("/api/exercise/complete", {
        courseId: courseExerciseData.courseId,
        chapterId: courseExerciseData.chapterId,
        exerciseId: exerciseIndex + 1,
        xpEarned: courseExerciseData.exercises[exerciseIndex]?.xp ?? 0,
      });

      if (res.data?.alreadyCompleted) {
        toast.info("Already completed! Great job 🏆");
      } else {
        toast.success(
          `+${courseExerciseData.exercises[exerciseIndex]?.xp ?? 0} XP — Exercise Completed! 🎉`
        );
        setTimeout(() => window.location.reload(), 1200);
      }
    } catch (err: any) {
      if (err?.response?.status === 401) {
        toast.error("Please sign in to save your progress.");
      } else {
        toast.error("Failed to submit. Please try again.");
      }
    }
  };

  const template = getSandpackTemplate(courseExerciseData?.editorType);
  const langLabel = getLanguageLabel(courseExerciseData?.editorType);
  const startCode = courseExerciseData?.ExerciseData?.exerciseContent?.startCode || {};
  const activeFile = Object.keys(startCode)[0] || "/index.html";

  return (
    <div className="h-full flex flex-col" style={{ background: "#1e1e1e" }}>
      <SandpackProvider
        theme={nightOwl}
        template={template as any}
        files={startCode}
        options={{ autorun: false, autoReload: false, activeFile }}
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {/* Code editor top toolbar */}
        <EditorToolbar
          onCompleteExercise={onCompleteExercise}
          IsCompleted={IsCompleted}
          langLabel={langLabel}
        />

        {/* Split: editor top, preview bottom */}
        <div style={{ flex: 1, minHeight: 0 }}>
          <ResizablePanelGroup direction="vertical" style={{ height: "100%" }}>

            {/* Code editor panel */}
            <ResizablePanel defaultSize={55} minSize={20}>
              <SandpackCodeEditor
                showTabs
                showLineNumbers
                showInlineErrors
                wrapContent={false}
                style={{ height: "100%", fontSize: "13px" }}
              />
            </ResizablePanel>

            {/* Drag handle */}
            <ResizableHandle
              className="transition-colors"
              style={{ height: "3px", background: "rgba(255,255,255,0.05)" }}
            />

            {/* Preview panel */}
            <ResizablePanel defaultSize={45} minSize={15}>
              <div className="h-full flex flex-col">
                <PreviewToolbar />
                <div style={{ flex: 1, minHeight: 0 }}>
                  <SandpackPreview
                    showNavigator={false}
                    showOpenInCodeSandbox={false}
                    showOpenNewtab
                    showRefreshButton
                    style={{ height: "100%" }}
                  />
                </div>
              </div>
            </ResizablePanel>

          </ResizablePanelGroup>
        </div>
      </SandpackProvider>
    </div>
  );
}

export default CodeEditor;
