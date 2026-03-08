import React from "react";
import CourseList from "../../courses/_components/CourseList";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function ExploreMoreCourse() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-white">Explore Other Courses</h2>
          <p className="text-sm text-[var(--fg-subtle)] mt-0.5">Discover what else you can learn</p>
        </div>
        <Link
          href="/courses"
          className="flex items-center gap-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors"
        >
          See all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <CourseList smallerCard={true} />
    </div>
  );
}

export default ExploreMoreCourse;
