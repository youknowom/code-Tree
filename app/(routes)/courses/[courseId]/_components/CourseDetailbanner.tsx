"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Course } from "../../_components/CourseList";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon, PlayCircle, BookOpen, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  loading: boolean;
  courseDetail: Course | undefined;
  refreshData: () => void;
};

const levelStyles: Record<string, string> = {
  Beginner: "bg-emerald-400/15 text-emerald-400 border-emerald-400/25",
  Intermediate: "bg-amber-400/15 text-amber-400 border-amber-400/25",
  Advanced: "bg-rose-400/15 text-rose-400 border-rose-400/25",
};

function CourseDetailbanner({ loading, courseDetail, refreshData }: Props) {
  // ✅ Hooks MUST be called before any conditional returns
  const [enrollLoading, setEnrollLoading] = useState(false);

  if (loading) {
    return (
      <div className="relative h-[320px] sm:h-[380px] overflow-hidden bg-[oklch(0.12_0.01_264)]">
        <div className="absolute inset-0 shimmer" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.09_0.008_264)] to-transparent" />
        <div className="absolute bottom-8 left-8 sm:left-12 space-y-4">
          <Skeleton className="h-6 w-24 rounded-full shimmer" />
          <Skeleton className="h-10 w-80 rounded-xl shimmer" />
          <Skeleton className="h-5 w-64 rounded-lg shimmer" />
          <Skeleton className="h-11 w-44 rounded-xl shimmer" />
        </div>
      </div>
    );
  }

  if (!courseDetail) return null;

  const imageSrc =
    courseDetail.bannerImage && courseDetail.bannerImage.trim() !== ""
      ? courseDetail.bannerImage
      : "/cookie.png";

  const handleEnroll = async () => {
    setEnrollLoading(true);
    try {
      await axios.post("/api/enroll-course", {
        courseId: courseDetail?.courseId,
      });
      toast.success("Successfully enrolled! Let's start learning 🎉");
      refreshData();
    } catch {
      toast.error("Failed to enroll. Please try again.");
    } finally {
      setEnrollLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden h-[320px] sm:h-[420px]">
      {/* Banner image */}
      <Image
        src={imageSrc}
        alt={`${courseDetail.title || "Course"} banner`}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Gradient overlays - creates depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12 max-w-3xl">
        {/* Level badge */}
        {courseDetail.level && (
          <span
            className={cn(
              "inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-bold border mb-5 uppercase tracking-wide",
              levelStyles[courseDetail.level] ?? levelStyles.Beginner
            )}
          >
            {courseDetail.level}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
          {courseDetail.title}
        </h1>

        <p className="text-sm sm:text-base text-white/60 max-w-xl leading-relaxed mb-5">
          {courseDetail.description}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
          {courseDetail.chapters && (
            <span className="flex items-center gap-1.5 text-white/50">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{courseDetail.chapters.length} chapters</span>
            </span>
          )}
          {courseDetail.userEnrolled && (
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Enrolled
            </span>
          )}
        </div>

        {/* CTA Button */}
        {!courseDetail.userEnrolled ? (
          <Button
            className="gradient-brand text-[oklch(0.1_0.005_264)] font-semibold border-0 hover:opacity-90 shadow-xl shadow-amber-400/25 h-11 px-7 self-start gap-2 transition-opacity"
            disabled={enrollLoading}
            onClick={handleEnroll}
          >
            {enrollLoading ? (
              <Loader2Icon className="animate-spin w-4 h-4" />
            ) : (
              <PlayCircle className="w-4 h-4" />
            )}
            {enrollLoading ? "Enrolling..." : "Enroll Now — It's Free"}
          </Button>
        ) : (
          <Button className="gradient-brand text-[oklch(0.1_0.005_264)] font-semibold border-0 hover:opacity-90 shadow-xl shadow-amber-400/25 h-11 px-7 self-start gap-2">
            <PlayCircle className="w-4 h-4" />
            Continue Learning
          </Button>
        )}
      </div>
    </div>
  );
}

export default CourseDetailbanner;
