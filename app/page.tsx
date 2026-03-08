import React from "react";
import type { Metadata } from "next";
import Hero from "./_components/Hero";
import Footer from "./_components/Footer";
import { Code2, Zap, Trophy, Users, BookOpen, Target, Quote } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CodeTree — Learn to Code Interactively",
  description:
    "Master web development with hands-on exercises, a live code editor, and a gamified learning path. Learn HTML, CSS, JavaScript, React, Python, and Gen AI for free.",
  alternates: { canonical: "/" },
};

const features = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Live Code Editor",
    description: "Write, run, and test code directly in your browser with our powerful interactive editor. No setup required.",
    color: "text-amber-400",
    bg: "bg-amber-400/8",
    border: "border-amber-400/15",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Instant Feedback",
    description: "Get real-time results as you code. No waiting, no setup — just pure learning momentum.",
    color: "text-violet-400",
    bg: "bg-violet-400/8",
    border: "border-violet-400/15",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Earn XP & Badges",
    description: "Level up as you learn. Collect experience points, unlock badges, and track your growth over time.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/8",
    border: "border-emerald-400/15",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Structured Curriculum",
    description: "Follow carefully crafted learning paths from beginner to advanced, covering all major technologies.",
    color: "text-sky-400",
    bg: "bg-sky-400/8",
    border: "border-sky-400/15",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Bite-Sized Exercises",
    description: "Short, focused challenges that fit into your schedule and build skills incrementally.",
    color: "text-rose-400",
    bg: "bg-rose-400/8",
    border: "border-rose-400/15",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Support",
    description: "Join thousands of learners in our Discord community. Ask questions, share projects, grow together.",
    color: "text-orange-400",
    bg: "bg-orange-400/8",
    border: "border-orange-400/15",
  },
];

const techStack = [
  "HTML", "CSS", "JavaScript", "React", "Python",
  "Gen AI", "Machine Learning", "React Advanced",
];

const testimonials = [
  {
    quote: "CodeTree completely changed how I learn. The exercises are addictive and the instant feedback keeps me motivated every single day.",
    name: "Sarah K.",
    role: "Frontend Developer",
    avatar: "SK",
    color: "bg-amber-400",
  },
  {
    quote: "I went from zero coding knowledge to building React apps in 3 months. The gamified approach makes it so much easier to stay consistent.",
    name: "Marcus T.",
    role: "Career Switcher",
    avatar: "MT",
    color: "bg-violet-400",
  },
  {
    quote: "The live code editor is incredible. You learn by doing, not just watching videos, and every exercise feels purposeful.",
    name: "Priya M.",
    role: "Computer Science Student",
    avatar: "PM",
    color: "bg-emerald-400",
  },
];

export default function Home() {
  return (
    <div className="bg-[var(--bg-page)]">
      {/* Hero */}
      <Hero />

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6" aria-labelledby="features-heading">
        {/* Subtle separator line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[var(--border-default)] to-transparent" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="chip mx-auto mb-5">
              <Zap className="w-3.5 h-3.5" />
              Why CodeTree
            </div>
            <h2
              id="features-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--fg)] leading-tight"
            >
              Everything you need to{" "}
              <span className="gradient-text-brand">level up your code</span>
            </h2>
            <p className="mt-5 text-lg text-[var(--fg-subtle)] max-w-xl mx-auto leading-relaxed">
              A complete learning ecosystem designed for modern developers, from first-timers to pros.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <article
                key={i}
                className={`group flex flex-col gap-4 p-6 rounded-2xl border ${feature.border} bg-[var(--bg-card)] card-hover cursor-default`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center ${feature.color} ring-1 ${feature.border} shrink-0 transition-transform duration-300 group-hover:scale-110`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--fg)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-4 sm:px-6 border-y border-[var(--border-subtle)]" aria-label="Technologies you will learn">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold text-[var(--fg-subtle)] uppercase tracking-widest mb-8">
            Technologies you&apos;ll master
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {techStack.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--fg-muted)] text-sm font-medium hover:bg-[var(--bg-elevated)] hover:text-[var(--fg)] hover:border-[var(--border-strong)] transition-all duration-200 cursor-default shadow-[var(--shadow-sm)]"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-brand text-[oklch(0.1_0.005_264)] font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-400/20"
            >
              Explore All Courses →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6" aria-labelledby="testimonials-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="chip mx-auto mb-5">
              <Quote className="w-3.5 h-3.5" />
              Learner Stories
            </div>
            <h2
              id="testimonials-heading"
              className="text-3xl sm:text-4xl font-bold text-[var(--fg)]"
            >
              Loved by{" "}
              <span className="gradient-text-brand">developers worldwide</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="flex flex-col gap-5 p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] card-hover"
              >
                <Quote className="w-5 h-5 text-amber-400/40" />
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${t.color} flex items-center justify-center text-xs font-bold text-black shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <cite className="text-sm font-semibold text-[var(--fg)] not-italic">{t.name}</cite>
                    <p className="text-xs text-[var(--fg-subtle)]">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
