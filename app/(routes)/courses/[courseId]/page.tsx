"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseDetailbanner from "./_components/CourseDetailbanner";
import { Course } from "../_components/CourseList";
import CourseChappter from "./_components/CourseChappter";
import CourseStatus from "./_components/CourseStatus";
import CommunityHelpSection from "./_components/CommunityHelpSection";

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params?.courseId as string;

  const [courseDetail, setCourseDetail] = useState<Course | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (courseId) getCourseDetail();
  }, [courseId]);

  const getCourseDetail = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/course?courseId=${courseId}`);
      setCourseDetail(res.data);
    } catch {
      // Error handled
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--fg)] pb-20">
      <CourseDetailbanner
        loading={loading}
        courseDetail={courseDetail}
        refreshData={getCourseDetail}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 px-4 sm:px-6 py-8 items-start">
        {/* Main Chapter Syllabus */}
        <div className="space-y-6">
          <CourseChappter
            loading={loading}
            courseDetail={courseDetail}
            refreshData={getCourseDetail}
          />
        </div>

        {/* Sidebar Status & Hints */}
        <div className="lg:sticky lg:top-20 lg:self-start space-y-5">
          <CourseStatus courseDetail={courseDetail} loading={loading} />
          <CommunityHelpSection />
        </div>
      </div>
    </div>
  );
}
