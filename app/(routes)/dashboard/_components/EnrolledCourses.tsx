"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Course } from "../../courses/_components/CourseList";
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

function EnrolledCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetUserEnrolledCourse();
  }, []);

  const GetUserEnrolledCourse = async () => {
    setLoading(true);
    const result = await axios.get("/api/course?courseId=enrolled");
    setEnrolledCourses(result.data);
    setLoading(false);
  };

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-white">Your Courses</h2>
          <p className="text-sm text-[var(--fg-subtle)] mt-0.5">Pick up where you left off</p>
        </div>
        <Link
          href="/courses"
          className="flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
        >
          Browse all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <Loader2 className="w-6 h-6 text-amber-400 animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && enrolledCourses.length === 0 && (
        <div className="flex flex-col items-center gap-5 py-14 px-6 rounded-2xl border border-[var(--border-default)] border-dashed bg-[var(--bg-card)] text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/8 border border-amber-400/15 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--fg)] mb-1.5">No courses yet</h3>
            <p className="text-sm text-[var(--fg-subtle)] max-w-xs">
              Start your learning journey by enrolling in a course.
            </p>
          </div>
          <Button
            asChild
            className="gradient-brand text-[oklch(0.1_0.005_264)] font-semibold border-0 hover:opacity-90 shadow-lg shadow-amber-400/20"
          >
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      )}

      {/* Course grid */}
      {!loading && enrolledCourses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {enrolledCourses.map((course, index) => (
            <CourseProgressCard key={index} courses={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
