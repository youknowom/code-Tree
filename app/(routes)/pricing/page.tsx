import type { Metadata } from "next";
import React from "react";
import {
  CheckCircle2,
  Sparkles,
  Zap,
  BookOpen,
  ArrowRight,
  Code2,
  Layers,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Free & Open Access | CodeTree",
  description:
    "CodeTree is 100% free while in active development. Enjoy full access to all courses, chapters, interactive code editors, and live previews with zero paywalls.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const freePerks = [
    {
      title: "All 8 Tracks Included",
      description: "Full access to TypeScript, React, Next.js, Tailwind, Python, JavaScript, CSS, and HTML tracks.",
      icon: <BookOpen className="w-5 h-5" />,
      color: "text-amber-400",
      bg: "bg-amber-400/8",
      border: "border-amber-400/15",
    },
    {
      title: "Interactive Sandbox",
      description: "Live browser-based coding with instant DOM preview and validation.",
      icon: <Code2 className="w-5 h-5" />,
      color: "text-sky-400",
      bg: "bg-sky-400/8",
      border: "border-sky-400/15",
    },
    {
      title: "Every Chapter Unlocked",
      description: "No artificial locks, trial periods, or gated exercises.",
      icon: <Layers className="w-5 h-5" />,
      color: "text-emerald-400",
      bg: "bg-emerald-400/8",
      border: "border-emerald-400/15",
    },
    {
      title: "Zero Credit Card Required",
      description: "Create an account or start exploring immediately without payment.",
      icon: <Heart className="w-5 h-5" />,
      color: "text-violet-400",
      bg: "bg-violet-400/8",
      border: "border-violet-400/15",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[var(--border-default)]">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-[100px]"
            style={{
              background:
                "radial-gradient(ellipse, oklch(0.76 0.18 85) 0%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="chip mx-auto mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free & Open
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--fg)] mb-5 leading-tight">
            Learn to Code{" "}
            <span className="gradient-text-brand">Without Paywalls</span>
          </h1>
          <p className="text-lg text-[var(--fg-muted)] max-w-2xl mx-auto">
            CodeTree is free while in active development. Every course, chapter,
            and exercise is completely accessible to every learner.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {freePerks.map((feature, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-5 rounded-2xl border ${feature.border} bg-[var(--bg-card)]`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center ${feature.color} shrink-0`}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--fg)] mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Free Plan Card */}
        <div className="p-8 sm:p-10 rounded-2xl border border-amber-400/20 bg-[var(--bg-card)] relative overflow-hidden text-center max-w-xl mx-auto shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-amber-500 bg-amber-400/10 border border-amber-400/20 mb-4">
            <Zap className="w-3.5 h-3.5" /> Full Access Tier
          </div>

          <div className="flex items-baseline justify-center gap-1 mb-3">
            <span className="text-5xl font-black text-[var(--fg)]">$0</span>
            <span className="text-sm text-[var(--fg-subtle)]">/ free forever</span>
          </div>

          <p className="text-sm text-[var(--fg-muted)] mb-8 max-w-md mx-auto">
            Start solving exercises immediately. No paywalls, no trial limits, and no credit card required.
          </p>

          <Button
            asChild
            size="lg"
            className="w-full gradient-brand text-[oklch(0.1_0.005_264)] font-bold hover:opacity-90 transition-opacity border-0 h-12 text-base shadow-lg shadow-amber-400/20"
          >
            <Link href="/courses">
              Start Learning Now <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </Button>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[var(--fg-subtle)]">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> All tracks open
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant code editor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
