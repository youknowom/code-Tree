"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { completedExcercises, exercises } from "../../../_components/CourseList";
import ContentSection from "../_components/ContentSection";
import CodeEditor from "../_components/CodeEditor";
import Link from "next/link";
import Image from "next/image";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle,
  List,
  Settings2,
  LayoutPanelLeft,
} from "lucide-react";

export type CourseExercise = {
  chapterId: number;
  courseId: number;
  desc: string;
  name: string;
  exercises: exercises[];
  ExerciseData: ExerciseData;
  completedExercise: completedExcercises[];
  editorType?: string;
};

type ExerciseData = {
  chapterId: number;
  courseId: number;
  exerciseId: string;
  exerciseName: string;
  exerciseContent: ExerciseContent;
};

type ExerciseContent = {
  content: string;
  hint: string;
  hintXp: string;
  startCode: any;
  task: string;
};

function Playground() {
  const { courseId, chapterId, exerciseslug } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseExerciseData, setCourseExerciseData] = useState<CourseExercise>();

  useEffect(() => {
    getExerciseCourseDetail();
  }, [courseId, chapterId, exerciseslug]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const getExerciseCourseDetail = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/exercise", {
        courseId: parseInt(courseId as string),
        chapterId: parseInt(chapterId as string),
        exerciseId: exerciseslug,
      });
      setCourseExerciseData(result.data);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  const exerciseInfo = useMemo(() => {
    return courseExerciseData?.exercises?.find((item) => item.slug === exerciseslug);
  }, [courseExerciseData, exerciseslug]);

  const currentIndex = useMemo(() => {
    return courseExerciseData?.exercises?.findIndex((item) => item.slug === exerciseslug) ?? -1;
  }, [courseExerciseData, exerciseslug]);

  const totalExercises = courseExerciseData?.exercises?.length ?? 0;
  const prevSlug = courseExerciseData?.exercises?.[currentIndex - 1]?.slug;
  const nextSlug = courseExerciseData?.exercises?.[currentIndex + 1]?.slug;
  const prevRoute = prevSlug ? `/courses/${courseId}/${chapterId}/${prevSlug}` : `/courses/${courseId}`;
  const nextRoute = nextSlug ? `/courses/${courseId}/${chapterId}/${nextSlug}` : `/courses/${courseId}`;

  const difficultyColor =
    exerciseInfo?.difficulty === "Hard"
      ? "text-rose-400"
      : exerciseInfo?.difficulty === "Medium"
        ? "text-amber-400"
        : "text-emerald-400";

  return (
    <div className="h-screen flex flex-col" style={{ background: "#0f0f0f" }}>
      {/* ── LeetCode-style Top Bar ── */}
      <header
        className="shrink-0 h-[46px] flex items-center justify-between px-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "#1a1a1a" }}
      >
        {/* Left — Logo + problem list */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden">
              <Image src="/logo.png" alt="CodeTree" fill className="object-contain" />
            </div>
            <span className="text-sm font-bold gradient-text-brand hidden sm:block">
              CodeTree
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10" />

          {/* Problem list button */}
          <Link
            href={`/courses/${courseId}`}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/6 text-white/50 hover:text-white/90 transition-all text-xs font-medium"
          >
            <List className="w-3.5 h-3.5" />
            Problem List
          </Link>

          {/* Prev / Next */}
          <div className="flex items-center gap-0.5">
            <Link
              href={prevRoute}
              className="p-1.5 rounded-md hover:bg-white/6 text-white/40 hover:text-white/90 transition-all"
              title="Previous exercise"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <Link
              href={nextRoute}
              className="p-1.5 rounded-md hover:bg-white/6 text-white/40 hover:text-white/90 transition-all"
              title="Next exercise"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Center — Exercise title + difficulty + progress */}
        <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
          <span className="text-sm font-semibold text-white/80 truncate max-w-[240px] sm:max-w-xs">
            {loading
              ? "Loading..."
              : courseExerciseData?.ExerciseData?.exerciseName ?? exerciseslug?.toString().replaceAll("-", " ")}
          </span>
          {exerciseInfo?.difficulty && (
            <span className={`text-xs font-semibold ${difficultyColor}`}>
              {exerciseInfo.difficulty}
            </span>
          )}
          {totalExercises > 0 && (
            <span className="text-xs text-white/25 hidden md:block">
              {currentIndex + 1} / {totalExercises}
            </span>
          )}
        </div>

        {/* Right — XP + settings */}
        <div className="flex items-center gap-2">
          {/* XP badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-amber-400">
              +{exerciseInfo?.xp ?? 0} XP
            </span>
          </div>

          <button className="p-1.5 rounded-md hover:bg-white/6 text-white/30 hover:text-white/70 transition-all">
            <Settings2 className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Main Panels ── */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" style={{ height: "100%" }}>

          {/* LEFT — Problem description */}
          <ResizablePanel defaultSize={38} minSize={22} maxSize={55}>
            <ContentSection courseExerciseData={courseExerciseData} loading={loading} />
          </ResizablePanel>

          <ResizableHandle
            className="w-[3px] transition-colors"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* RIGHT — Code editor + preview */}
          <ResizablePanel defaultSize={62} minSize={35}>
            <CodeEditor courseExerciseData={courseExerciseData} loading={loading} />
          </ResizablePanel>

        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default Playground;
