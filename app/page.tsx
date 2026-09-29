import React from "react";
import type { Metadata } from "next";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";
import {
  Code2,
  Zap,
  Trophy,
  BookOpen,
  Target,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Terminal,
  Check,
  X,
  Laptop,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "CodeTree — Practice-Driven Web Development & Interactive Coding",
  description:
    "Master web development through interactive coding exercises, in-browser sandboxes, and immediate automated test feedback. Learn TypeScript, React, Next.js, HTML, CSS, JavaScript, and Python.",
  alternates: { canonical: "/" },
};

const learningSteps = [
  {
    step: "01",
    title: "Digest the Concept",
    desc: "Targeted, bite-sized lessons explaining one core pattern at a time. No 40-minute fluff videos.",
    badge: "Concise Theory",
  },
  {
    step: "02",
    title: "Code in the Sandbox",
    desc: "Immediately write code in a live, in-browser editor with zero local configuration or toolchain headaches.",
    badge: "Hands-on Practice",
  },
  {
    step: "03",
    title: "Pass Automated Assertions",
    desc: "Run real test specs against your DOM or script. Get instant pass/fail feedback and earn verified XP.",
    badge: "Instant Validation",
  },
];

const comparisonData = [
  {
    aspect: "Retention & Mastery",
    video: "Passive: ~15% recall after 48 hours",
    codetree: "Active: High muscle memory through direct code writing",
  },
  {
    aspect: "Setup & Tooling",
    video: "Stuck in node/npm/vite config before line 1",
    codetree: "Zero installation: in-browser Sandpack ready in 1 second",
  },
  {
    aspect: "Feedback Loop",
    video: "Guessing whether your code works",
    codetree: "Automated test assertions with instant DOM feedback",
  },
  {
    aspect: "Skill Progression",
    video: "Mindless copying with no verification",
    codetree: "Milestone badges, authentic XP, and structured track unlocks",
  },
];

const featuredTracks = [
  {
    title: "TypeScript Essentials",
    level: "Intermediate",
    tag: "TypeScript",
    chapters: 6,
    desc: "Master type annotations, interfaces, union types, and generics with compile-time safety.",
    link: "/courses/5",
  },
  {
    title: "React 19 Beginner",
    level: "Beginner",
    tag: "React",
    chapters: 12,
    desc: "Learn components, props, state hooks, and component lifecycle by building UI pieces.",
    link: "/courses/1",
  },
  {
    title: "Next.js Fullstack",
    level: "Intermediate",
    tag: "Next.js",
    chapters: 6,
    desc: "App Router, Server vs Client Components, dynamic routes, and Server Actions.",
    link: "/courses/8",
  },
  {
    title: "Tailwind CSS Mastery",
    level: "Beginner",
    tag: "Tailwind",
    chapters: 5,
    desc: "Build responsive, modern UI cards, grids, and flex layouts with utility-first CSS.",
    link: "/courses/6",
  },
  {
    title: "JavaScript Core",
    level: "Beginner",
    tag: "JavaScript",
    chapters: 12,
    desc: "Data structures, DOM manipulation, async/await, and modern ES6+ patterns.",
    link: "/courses/4",
  },
  {
    title: "Python Fundamentals",
    level: "Beginner",
    tag: "Python",
    chapters: 6,
    desc: "Syntax, lists, dictionaries, loops, functions, and object-oriented programming.",
    link: "/courses/7",
  },
];

export default function Home() {
  return (
    <div className="bg-[var(--bg-page)] text-[var(--fg)] min-h-screen">
      {/* ── 1. Hero Section ── */}
      <Hero />

      {/* ── 2. The 3-Step Learning Loop ── */}
      <section className="py-20 px-4 sm:px-6 border-y border-[var(--border-default)] bg-[var(--bg-elevated)]/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 block">
              The Learning Loop
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--fg)]">
              How you learn on CodeTree
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--fg-muted)]">
              A deliberate cognitive loop engineered to build genuine software engineering fluency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-amber-500/20 font-mono">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--fg)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Featured Tracks Showcase ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 block">
                Structured Tracks
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--fg)]">
                From First Tag to Production Fullstack
              </h2>
            </div>
            <Link
              href="/courses"
              className="text-sm font-semibold text-amber-500 hover:text-amber-600 flex items-center gap-1 shrink-0"
            >
              View all 8 tracks <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredTracks.map((track, i) => (
              <Link
                key={i}
                href={track.link}
                className="group p-5 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] hover:border-amber-500/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      {track.tag}
                    </span>
                    <span className="text-xs text-[var(--fg-subtle)] font-medium">
                      {track.chapters} Chapters
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--fg)] group-hover:text-amber-500 transition-colors">
                    {track.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[var(--fg-muted)] leading-relaxed line-clamp-2">
                    {track.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <span className="text-[var(--fg-subtle)]">{track.level}</span>
                  <span className="font-semibold text-amber-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Start Track <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Why Practice Beats Video Tutorials ── */}
      <section className="py-20 px-4 sm:px-6 border-t border-[var(--border-default)] bg-[var(--bg-elevated)]/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 block">
              Pedagogy & Science
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--fg)]">
              Why passive tutorials fail
            </h2>
            <p className="mt-3 text-sm text-[var(--fg-muted)]">
              Watching someone code creates an illusion of competence. Active retrieval in an editor builds real engineers.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)]">
              {/* Left: Video Tutorials */}
              <div className="p-6 sm:p-8 space-y-4 bg-rose-500/3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-rose-500/15 text-rose-500 flex items-center justify-center font-bold text-xs">
                    <X className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--fg)]">
                    Passive Video Watching
                  </h3>
                </div>

                <div className="space-y-3 pt-2 text-xs text-[var(--fg-muted)] leading-relaxed">
                  <p>• Fast forward through syntax explanations without typing.</p>
                  <p>• Constant pause-and-copy leads to syntax blindness.</p>
                  <p>• Zero automated feedback on edge cases or typos.</p>
                  <p>• Forgotten 3 days later when starting an empty project.</p>
                </div>
              </div>

              {/* Right: CodeTree */}
              <div className="p-6 sm:p-8 space-y-4 bg-emerald-500/3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold text-xs">
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--fg)]">
                    The CodeTree Method
                  </h3>
                </div>

                <div className="space-y-3 pt-2 text-xs text-[var(--fg-muted)] leading-relaxed">
                  <p>• Read 2-3 focused paragraphs, then write real code.</p>
                  <p>• Sandpack execution tests your output in real browser runtime.</p>
                  <p>• Automated assertion test harness validates every line.</p>
                  <p>• Retain muscle memory, earn XP, and build momentum daily.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Final CTA Banner ── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto rounded-3xl border border-[var(--border-default)] bg-[var(--bg-card)] p-8 sm:p-14 text-center relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--fg)] tracking-tight">
              Ready to write your first lines of code?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-[var(--fg-muted)] leading-relaxed">
              No credit card. No software downloads. Choose a track and start solving interactive challenges right in your browser.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm h-12 px-8 rounded-xl shadow-md border border-amber-400/30"
              >
                <Link href="/courses">Explore All Curriculum</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
