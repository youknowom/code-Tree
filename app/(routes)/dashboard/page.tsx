import React from "react";
import WelcomeBanner from "./_components/WelcomeBanner";
import EnrolledCourses from "./_components/EnrolledCourses";
import ExploreMore from "./_components/ExploreMore";
import ExploreMoreCourse from "./_components/ExploreMoreCourse";
import InviteFriend from "./_components/InviteFriend";
import UserStatus from "./_components/UserStatus";
import UpgradeToPro from "./_components/UpgradeToPro";

function page() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
          {/* Main Content */}
          <div className="space-y-8 min-w-0">
            <WelcomeBanner />
            <EnrolledCourses />
            <ExploreMore />
            <ExploreMoreCourse />
            <InviteFriend />
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <UserStatus />
            <UpgradeToPro />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
