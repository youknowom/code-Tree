import React from "react";
import type { Metadata } from "next";
import CourseList from "./_components/CourseList";
import { BookOpen, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "All Courses",
  description:
    "Browse all CodeTree courses — HTML, CSS, JavaScript, React, Python, Gen AI, Machine Learning, and more. Structured learning paths for every skill level.",
  alternates: { canonical: "/courses" },
};


export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b border-[var(--border-default)]">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(to right, oklch(1 0 0 / 0.5) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute -top-20 -left-20 w-[600px] h-[400px] rounded-full opacity-20 blur-[80px]"
            style={{ background: "radial-gradient(ellipse, oklch(0.76 0.18 85) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-10 right-0 w-[400px] h-[300px] rounded-full opacity-15 blur-[80px]"
            style={{ background: "radial-gradient(ellipse, oklch(0.65 0.22 265) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="chip mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            All Courses
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--fg)] mb-4 leading-tight">
            Explore All{" "}
            <span className="gradient-text-brand">Courses</span>
          </h1>
          <p className="text-lg text-[var(--fg-muted)] max-w-xl leading-relaxed">
            Discover structured courses to learn, build skills, and advance your career — from beginner to advanced.
          </p>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[var(--fg-subtle)] text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            All available courses
          </div>
        </div>
        <CourseList />
      </div>
    </div>
  );
}
