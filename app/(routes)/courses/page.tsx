"use client";

import React, { useState } from "react";
import CourseList from "./_components/CourseList";
import { BookOpen, Sparkles, Search, Layers, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "All Tracks" },
  { id: "aiml", label: "AI & Machine Learning" },
  { id: "deeplearning", label: "Deep Learning & PyTorch" },
  { id: "genai", label: "Generative AI & LLMs" },
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
  { id: "web", label: "Web Engineering" },
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--fg)] pb-24">
      {/* ── Page Header ── */}
      <div className="relative border-b border-[var(--border-default)] bg-[var(--bg-elevated)]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-500 dark:text-amber-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Curriculum · 12 Specialization Tracks · Verified Certificates</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--fg)]">
            Explore All Tracks
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[var(--fg-muted)] max-w-xl leading-relaxed">
            Choose a guided path, practice code in live interactive sandboxes, complete capstone projects, and earn verified certificates of completion.
          </p>

          {/* Search Bar & Filter Controls */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[var(--fg-subtle)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search tracks (e.g. TypeScript, React, Python)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] text-sm text-[var(--fg)] placeholder:text-[var(--fg-subtle)] focus:outline-hidden focus:border-amber-500/60 transition-colors shadow-xs"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                    selectedCategory === cat.id
                      ? "bg-amber-500 text-slate-950 shadow-xs"
                      : "bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-amber-500/30"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Courses Grid Content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        <CourseList
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
}
