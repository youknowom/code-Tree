"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export type Course = {
  id: number;
  courseId: number;
  title: string;
  description: string;
  bannerImage: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  tags?: string;
  chapters?: chapter[];
  userEnrolled?: boolean;
  courseEnrolledInfo?: courseEnrolledInfo;
  completedExcercises: completedExcercises[];
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

const levelStyles: Record<NonNullable<Course["level"]>, { bg: string; text: string; border: string }> = {
  Beginner: { bg: "bg-emerald-400/10", text: "text-emerald-400", border: "border-emerald-400/20" },
  Intermediate: { bg: "bg-amber-400/10", text: "text-amber-400", border: "border-amber-400/20" },
  Advanced: { bg: "bg-rose-400/10", text: "text-rose-400", border: "border-rose-400/20" },
};

type Props = {
  smallerCard?: boolean;
};

function CourseList({ smallerCard = false }: Props) {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/course");
      setCourseList(res.data);
    } catch (error) {
      // Error handled by UI feedback
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden shimmer",
              smallerCard ? "h-[160px]" : "h-[280px]"
            )}
          />
        ))}
      </div>
    );
  }

  if (courseList.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 rounded-2xl border border-[var(--border-default)] border-dashed bg-[var(--bg-card)] text-center">
        <BookOpen className="w-10 h-10 text-[var(--fg-subtle)]" />
        <p className="text-[var(--fg-subtle)] text-sm">No courses available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courseList.map((course) => (
        <CourseCardItem key={course.courseId} course={course} smallerCard={smallerCard} />
      ))}
    </div>
  );
}

function CourseCardItem({ course, smallerCard }: { course: Course, smallerCard: boolean }) {
  const [imgSrc, setImgSrc] = useState(course.bannerImage);

  return (
    <Link
      href={`/courses/${course.courseId}`}
      className="group block rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden card-hover"
    >
      {/* Thumbnail */}
      <div className={cn(
        "relative overflow-hidden bg-[var(--bg-panel)]",
        smallerCard ? "h-[110px]" : "h-[180px]"
      )}>
        <Image
          src={imgSrc ? imgSrc : "/cookie.png"}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgSrc("/cookie.png")}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0.01_264)] via-transparent to-transparent opacity-60" />

        {/* Level badge */}
        {course.level && (
          <div className="absolute top-3 left-3">
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-semibold border",
              levelStyles[course.level].bg,
              levelStyles[course.level].text,
              levelStyles[course.level].border
            )}>
              {course.level}
            </span>
          </div>
        )}

        {/* Chapters count */}
        {course.chapters && course.chapters.length > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-[var(--border-strong)]">
            <BookOpen className="w-3 h-3 text-[var(--fg-muted)]" />
            <span className="text-xs text-[var(--fg-muted)] font-medium">{course.chapters.length} ch</span>
          </div>
        )}
      </div>

      {/* Content */}
      {!smallerCard && (
        <div className="p-4">
          <h3 className="font-bold text-[var(--fg)] mb-1.5 group-hover:text-amber-400 transition-colors line-clamp-1">
            {course.title}
          </h3>
          <p className="text-sm text-[var(--fg-subtle)] line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>
      )}
      {smallerCard && (
        <div className="p-3">
          <h3 className="font-semibold text-sm text-[var(--fg)] group-hover:text-amber-400 transition-colors line-clamp-1">
            {course.title}
          </h3>
        </div>
      )}
    </Link>
  );
}

export default CourseList;
