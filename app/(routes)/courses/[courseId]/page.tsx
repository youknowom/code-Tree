"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseDetailbanner from "./_components/CourseDetailbanner";
import { Course } from "../_components/CourseList";
import CourseChappter from "./_components/CourseChappter";
import CourseStatus from "./_components/CourseStatus";
import UpgradeToPro from "../../dashboard/_components/UpgradeToPro";
import CommunityHelpSection from "./_components/CommunityHelpSection";

function CourseDetail() {
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
    } catch (error) {
      // Error handled by UI feedback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[oklch(0.09_0.008_264)]">
      <CourseDetailbanner
        loading={loading}
        courseDetail={courseDetail}
        refreshData={getCourseDetail}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 px-4 sm:px-6 py-8 lg:py-10 items-start">
        {/* Main Content */}
        <div className="space-y-6">
          <CourseChappter
            loading={loading}
            courseDetail={courseDetail}
            refreshData={getCourseDetail}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-20 lg:self-start space-y-4">
          <CourseStatus courseDetail={courseDetail} loading={loading} />
          <UpgradeToPro />
          <CommunityHelpSection />
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
