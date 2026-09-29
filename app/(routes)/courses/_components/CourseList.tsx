"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { BookOpen, Search, ArrowRight, Code2, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import CourseIcon from "@/components/CourseIcon";

export type Course = {
  id: number;
  courseId: number;
  title: string;
  description: string;
  bannerImage: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  tags?: string;
  editorType?: string;
  category?: string;
  duration?: string;
  instructor?: string;
  passingScore?: number;
  certificateEnabled?: boolean;
  overview?: any;
  chapters?: chapter[];
  userEnrolled?: boolean;
  courseEnrolledInfo?: courseEnrolledInfo;
  completedExcercises: completedExcercises[];
  assessment?: any;
  certificate?: any;
};

export type completedExcercises = {
  chapterId: number;
  courseId: number;
  exerciseId: number;
};

export type courseEnrolledInfo = {
  xpEarned: number;
  enrolledDate: any;
};

export type chapter = {
  chapterId: number;
  courseId: number;
  description: string;
  name: string;
  id: number;
  exercises: exercises[];
};

export type exercises = {
  name: string;
  slug: string;
  xp: number;
  difficulty: string;
};

const levelStyles: Record<
  NonNullable<Course["level"]>,
  { bg: string; text: string; border: string }
> = {
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
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/20",
  },
};

type Props = {
  smallerCard?: boolean;
  searchQuery?: string;
  selectedCategory?: string;
};

export default function CourseList({
  smallerCard = false,
  searchQuery = "",
  selectedCategory = "all",
}: Props) {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/course");
      setCourseList(res.data || []);
    } catch {
      // handled
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = useMemo(() => {
    return courseList.filter((course) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        course.title.toLowerCase().includes(q) ||
        course.description?.toLowerCase().includes(q) ||
        course.tags?.toLowerCase().includes(q) ||
        course.category?.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (selectedCategory === "all") return true;
      if (selectedCategory === "beginner") return course.level === "Beginner";
      if (selectedCategory === "intermediate")
        return course.level === "Intermediate";
      if (selectedCategory === "advanced")
        return course.level === "Advanced";

      if (selectedCategory === "aiml")
        return (
          course.category === "AI/ML" ||
          ["python", "numpy", "machine learning", "scikit", "deep learning", "pytorch", "generative", "rag", "llm"].some(
            (t) => (course.tags || "").toLowerCase().includes(t)
          )
        );

      if (selectedCategory === "deeplearning")
        return (
          course.title.toLowerCase().includes("deep learning") ||
          course.title.toLowerCase().includes("pytorch") ||
          (course.tags || "").toLowerCase().includes("pytorch")
        );

      if (selectedCategory === "genai")
        return (
          course.title.toLowerCase().includes("generative") ||
          course.title.toLowerCase().includes("rag") ||
          course.title.toLowerCase().includes("agent") ||
          (course.tags || "").toLowerCase().includes("generative")
        );

      if (selectedCategory === "web")
        return ["React", "HTML", "CSS", "Tailwind", "Next.js", "TypeScript", "JavaScript"].some((t) =>
          (course.tags || "").toLowerCase().includes(t.toLowerCase())
        );

      return true;
    });
  }, [courseList, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden h-[260px] animate-pulse p-6 space-y-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)]" />
            <div className="h-5 bg-[var(--bg-elevated)] rounded-md w-3/4" />
            <div className="h-3 bg-[var(--bg-elevated)] rounded-md w-full" />
            <div className="h-3 bg-[var(--bg-elevated)] rounded-md w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 px-4 rounded-2xl border border-[var(--border-default)] border-dashed bg-[var(--bg-card)] text-center">
        <BookOpen className="w-8 h-8 text-[var(--fg-subtle)]" />
        <h3 className="font-bold text-base text-[var(--fg)]">No tracks found</h3>
        <p className="text-xs text-[var(--fg-muted)] max-w-sm">
          No courses matched your current search filters. Try clearing the search query or selecting &quot;All Tracks&quot;.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {filteredCourses.map((course) => (
        <CourseCardItem
          key={course.courseId}
          course={course}
          smallerCard={smallerCard}
        />
      ))}
    </div>
  );
}

function CourseCardItem({
  course,
  smallerCard,
}: {
  course: Course;
  smallerCard: boolean;
}) {
  const isAiml =
    course.category === "AI/ML" ||
    course.courseId >= 9 ||
    ["Python", "Machine Learning", "Deep Learning", "PyTorch", "Generative"].some((k) =>
      (course.tags || "").includes(k)
    );

  return (
    <Link
      href={`/courses/${course.courseId}`}
      className="group flex flex-col justify-between rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5 hover:border-amber-500/40 hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <CourseIcon tag={course.tags || course.title} size={36} />

          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {course.certificateEnabled !== false && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/25 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Certificate
              </span>
            )}

            {course.level && (
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider",
                  levelStyles[course.level]?.bg || "bg-emerald-500/10",
                  levelStyles[course.level]?.text || "text-emerald-500",
                  levelStyles[course.level]?.border || "border-emerald-500/20"
                )}
              >
                {course.level}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-[var(--fg)] group-hover:text-amber-500 transition-colors line-clamp-1 mb-1.5">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-[var(--fg-muted)] line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Metadata subline */}
        <div className="mt-3 flex items-center gap-3 text-[11px] text-[var(--fg-subtle)] font-medium">
          {course.duration && (
            <span>⏱ {course.duration}</span>
          )}
          {course.instructor && (
            <span className="truncate max-w-[180px]">By {course.instructor.split(",")[0]}</span>
          )}
        </div>
      </div>

      {/* Card Footer Bar */}
      <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
        <span className="text-[var(--fg-subtle)] font-medium">
          {isAiml
            ? "Python / AI Engine"
            : course.editorType === "vanilla-ts"
            ? "TypeScript Sandbox"
            : course.editorType === "react"
            ? "React 19 Runtime"
            : course.editorType === "static"
            ? "HTML / CSS Preview"
            : "JavaScript Engine"}
        </span>

        <span className="font-semibold text-amber-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
          Open Track <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
