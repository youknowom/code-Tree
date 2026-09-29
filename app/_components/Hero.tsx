"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Sparkles,
  Trophy,
  CheckCircle2,
  Play,
  RotateCcw,
  Terminal,
  Check,
  Zap,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { fireConfetti } from "@/components/ConfettiBlast";

const tracksSummary = [
  { name: "TypeScript", level: "Intermediate" },
  { name: "React 19", level: "Beginner" },
  { name: "Next.js", level: "Intermediate" },
  { name: "Tailwind CSS", level: "Beginner" },
  { name: "Python", level: "Beginner" },
  { name: "JavaScript", level: "Beginner" },
];

export default function Hero() {
  const { data: session } = useSession();
  const isSignedIn = !!session?.user;

  // Interactive In-Hero Code Demo State
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleRunDemo = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
      fireConfetti();
    }, 600);
  };

  const handleResetDemo = () => {
    setHasRun(false);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[var(--bg-page)] pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* ── Background Grid & Radial Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--border-default) 1px, transparent 1px), linear-gradient(to right, var(--border-default) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Subtle warm amber glow top-center */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full blur-[140px] opacity-15 dark:opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.76 0.18 85) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Eyebrow Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-500 dark:text-amber-400 text-xs font-semibold mb-6 animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Hands-On In-Browser Coding · Zero Local Setup</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--fg)] max-w-4xl leading-[1.08] animate-fade-in-up animate-delay-100">
          Code by doing.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-500">
            Not by watching.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-[var(--fg-muted)] max-w-2xl leading-relaxed font-normal animate-fade-in-up animate-delay-200">
          Escape tutorial hell. Learn modern web development through bite-sized
          challenges, an instant in-browser sandbox, and automated test assertions.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 animate-fade-in-up animate-delay-300">
          <Button
            asChild
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm h-12 px-7 rounded-xl shadow-md shadow-amber-500/20 border border-amber-400/40 cursor-pointer"
          >
            <Link href={isSignedIn ? "/courses" : "/sign-up"}>
              {isSignedIn ? "Go to Curriculum" : "Start Learning Free"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[var(--border-default)] hover:bg-[var(--overlay-6)] text-[var(--fg)] font-semibold text-sm h-12 px-6 rounded-xl cursor-pointer"
          >
            <Link href="/courses">Explore 8 Tracks</Link>
          </Button>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--fg-subtle)] font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>8 Complete Tracks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Instant Sandbox Validation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>100% Free & Open Access</span>
          </div>
        </div>

        {/* ── Interactive Hero Workspace Demo Mockup ── */}
        <div className="mt-14 w-full max-w-4xl text-left rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] shadow-2xl overflow-hidden animate-fade-in-up animate-delay-400">
          {/* Mockup Titlebar */}
          <div className="px-4 py-3 bg-[var(--bg-elevated)] border-b border-[var(--border-default)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="ml-2 text-xs font-mono text-[var(--fg-subtle)]">
                codetree-workspace: challenge-01.ts
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex text-[11px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                +25 XP Challenge
              </span>
            </div>
          </div>

          {/* Mockup Workspace Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[var(--border-default)]">
            {/* Left Column: Challenge & Test Spec */}
            <div className="md:col-span-5 p-5 bg-[var(--bg-card)] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    TypeScript
                  </span>
                  <span className="text-xs text-[var(--fg-subtle)] font-medium">
                    Exercise 1 of 6
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--fg)]">
                  Reverse a String Function
                </h3>
                <p className="mt-1 text-xs text-[var(--fg-muted)] leading-relaxed">
                  Write a typed function <code>reverseText(str: string): string</code> that returns the reversed string.
                </p>

                {/* Assertions Checklist */}
                <div className="mt-4 space-y-2">
                  <p className="text-[11px] font-semibold text-[var(--fg-subtle)] uppercase tracking-wider">
                    Automated Test Assertions:
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    {hasRun ? (
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[var(--border-default)] shrink-0" />
                    )}
                    <span className={hasRun ? "text-emerald-500" : "text-[var(--fg-muted)]"}>
                      reverseText("code") === "edoc"
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    {hasRun ? (
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[var(--border-default)] shrink-0" />
                    )}
                    <span className={hasRun ? "text-emerald-500" : "text-[var(--fg-muted)]"}>
                      reverseText("tree") === "eert"
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    {hasRun ? (
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[var(--border-default)] shrink-0" />
                    )}
                    <span className={hasRun ? "text-emerald-500" : "text-[var(--fg-muted)]"}>
                      Type signature returns string
                    </span>
                  </div>
                </div>
              </div>

              {/* Status footer inside left column */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs">
                {hasRun ? (
                  <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> All Tests Passed! (+25 XP)
                  </span>
                ) : (
                  <span className="text-[var(--fg-subtle)]">
                    Ready to execute assertions
                  </span>
                )}

                {hasRun && (
                  <button
                    onClick={handleResetDemo}
                    className="text-xs text-[var(--fg-subtle)] hover:text-[var(--fg)] flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Code Editor & Runner */}
            <div className="md:col-span-7 bg-[#0b0c10] text-[#e2e8f0] p-5 flex flex-col justify-between font-mono text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-800 pb-2 mb-3 font-sans">
                  <span>solution.ts</span>
                  <span className="text-amber-400">TypeScript 5.x</span>
                </div>

                <p className="text-slate-500">// Your solution implementation</p>
                <p>
                  <span className="text-amber-400">export function</span>{" "}
                  <span className="text-sky-300">reverseText</span>(
                  <span className="text-slate-300">str</span>:{" "}
                  <span className="text-amber-300">string</span>):{" "}
                  <span className="text-amber-300">string</span> {"{"}
                </p>
                <p className="pl-4">
                  <span className="text-amber-400">return</span> str
                  <br />
                  <span className="pl-4">.</span>
                  <span className="text-sky-300">split</span>(<span className="text-emerald-300">""</span>)
                  <br />
                  <span className="pl-4">.</span>
                  <span className="text-sky-300">reverse</span>()
                  <br />
                  <span className="pl-4">.</span>
                  <span className="text-sky-300">join</span>(<span className="text-emerald-300">""</span>);
                </p>
                <p>{"}"}</p>
              </div>

              {/* Execution Bar */}
              <div className="mt-6 pt-3 border-t border-slate-800 flex items-center justify-between font-sans">
                <span className="text-[11px] text-slate-500">
                  {isRunning ? "Running test harness..." : hasRun ? "Execution time: 14ms" : "Press Run to test solution"}
                </span>

                <Button
                  onClick={handleRunDemo}
                  disabled={isRunning || hasRun}
                  size="sm"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-8 px-4 rounded-lg cursor-pointer"
                >
                  {isRunning ? (
                    "Testing..."
                  ) : hasRun ? (
                    "Passed ✓"
                  ) : (
                    <>
                      <Play className="w-3 h-3 mr-1.5 fill-current" /> Run Tests
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tracks Tag Carousel */}
        <div className="mt-14 w-full max-w-3xl">
          <p className="text-xs font-semibold text-[var(--fg-subtle)] uppercase tracking-wider mb-4">
            Curated tracks ready to explore:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {tracksSummary.map((t, idx) => (
              <Link
                key={idx}
                href="/courses"
                className="px-3.5 py-1.5 rounded-full border border-[var(--border-default)] bg-[var(--bg-elevated)] hover:border-amber-500/40 text-[var(--fg)] text-xs font-semibold transition-all hover:scale-105"
              >
                {t.name} <span className="text-[var(--fg-subtle)] font-normal">({t.level})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
