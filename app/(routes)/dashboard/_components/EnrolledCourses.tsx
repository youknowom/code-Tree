"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseProgressCard from "./CourseProgressCard";
import { BookOpen, ArrowRight, Loader2 } from "lucide-react";

export type EnrolledCourseInfo = {
  bannerImage: string;
  CourseDetail: number;
  completedExercises: number;
  title: string;
  level: string;
  totalExercises: number;
  xpEarned: number;
  courseId: number;
};

export default function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserEnrolledCourse();
  }, []);

  const getUserEnrolledCourse = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/course?courseId=enrolled");
      setEnrolledCourses(result.data || []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-default)]">
        <div>
          <h2 className="text-lg font-bold text-[var(--fg)] tracking-tight">
            Active Learning Tracks
          </h2>
          <p className="text-xs text-[var(--fg-muted)]">
            Pick up exactly where you left off
          </p>
        </div>
        <Link
          href="/courses"
          className="flex items-center gap-1 text-xs font-semibold text-amber-500 hover:text-amber-600 transition-colors"
        >
          All Tracks ({enrolledCourses.length}) <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)]">
          <Loader2 className="w-5 h-5 text-amber-500 animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && enrolledCourses.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-12 px-6 rounded-2xl border border-[var(--border-default)] border-dashed bg-[var(--bg-card)] text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[var(--fg)] mb-1">
              No tracks started yet
            </h3>
            <p className="text-xs text-[var(--fg-muted)] max-w-xs">
              Select any guided track to start solving code challenges right away.
            </p>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs"
          >
            <Link href="/courses">Browse Curriculum</Link>
          </Button>
        </div>
      )}

      {/* Course grid */}
      {!loading && enrolledCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledCourses.map((course, index) => (
            <CourseProgressCard key={index} courses={course} />
          ))}
        </div>
      )}
    </div>
  );
}
