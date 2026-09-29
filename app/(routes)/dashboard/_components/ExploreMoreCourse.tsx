import React from "react";
import CourseList from "../../courses/_components/CourseList";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function ExploreMoreCourse() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-[var(--fg)] tracking-tight">Explore More Tracks</h2>
          <p className="text-xs text-[var(--fg-muted)] mt-0.5">Expand your developer stack</p>
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
