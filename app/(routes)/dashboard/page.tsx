import React from "react";
import EnrolledCourses from "./_components/EnrolledCourses";
import MyCertificates from "./_components/MyCertificates";
import ExploreMoreCourse from "./_components/ExploreMoreCourse";
import UserStatus from "./_components/UserStatus";
import DailyGoal from "./_components/DailyGoal";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
          {/* Main Content */}
          <div className="space-y-8 min-w-0">
            <EnrolledCourses />
            <MyCertificates />
            <ExploreMoreCourse />
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <UserStatus />
            <DailyGoal />
          </div>
        </div>
      </div>
    </div>
  );
}
