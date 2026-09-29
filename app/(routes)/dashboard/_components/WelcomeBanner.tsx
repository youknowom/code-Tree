"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Sun,
  SunMedium,
  Moon,
  MoonStar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Flame,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WelcomeBanner() {
  const { data: session } = useSession();
  const user = session?.user;

  const [mounted, setMounted] = useState(false);
  const [greetingInfo, setGreetingInfo] = useState({
    greeting: "Welcome back",
    subtext: "Ready to practice? Let's write some code today.",
    timeLabel: "Daily Practice",
    icon: <Sparkles className="w-3.5 h-3.5" />,
  });

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    const hour = now.getHours();

    // Format current date: e.g. "Wednesday, Sep 30"
    const dateFormatted = now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });

    if (hour >= 5 && hour < 12) {
      setGreetingInfo({
        greeting: "Good morning",
        subtext: "Start your morning with a win. Solve a quick challenge to build momentum.",
        timeLabel: `${dateFormatted} · Morning Session`,
        icon: <Sun className="w-3.5 h-3.5 text-amber-500" />,
      });
    } else if (hour >= 12 && hour < 17) {
      setGreetingInfo({
        greeting: "Good afternoon",
        subtext: "Keep the momentum going. Great software engineers build consistent daily habits.",
        timeLabel: `${dateFormatted} · Afternoon Focus`,
        icon: <SunMedium className="w-3.5 h-3.5 text-amber-500" />,
      });
    } else if (hour >= 17 && hour < 22) {
      setGreetingInfo({
        greeting: "Good evening",
        subtext: "Wind down with some focused code practice before closing out the day.",
        timeLabel: `${dateFormatted} · Evening Practice`,
        icon: <Moon className="w-3.5 h-3.5 text-amber-400" />,
      });
    } else {
      setGreetingInfo({
        greeting: "Late night coding",
        subtext: "Quiet hours are prime for deep focus. Let's make progress on your active track.",
        timeLabel: `${dateFormatted} · Midnight Session`,
        icon: <MoonStar className="w-3.5 h-3.5 text-indigo-400" />,
      });
    }
  }, []);

  const firstName = user?.name ? user.name.split(" ")[0] : "Learner";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 sm:p-7 shadow-xs">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(var(--border-default) 1px, transparent 1px), linear-gradient(to right, var(--border-default) 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute -top-20 right-0 w-[400px] h-[300px] rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.76 0.18 85) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-xl">
          {/* Eyebrow date pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] text-xs font-medium text-[var(--fg-muted)]">
            {mounted ? greetingInfo.icon : <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
            <span>{mounted ? greetingInfo.timeLabel : "Daily Practice Session"}</span>
          </div>

          {/* Greeting Headline */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg)] tracking-tight">
            {mounted ? greetingInfo.greeting : "Welcome back"},{" "}
            <span className="text-amber-500 dark:text-amber-400">
              {firstName}
            </span>
            !
          </h1>

          {/* Motivational Subtext */}
          <p className="text-xs sm:text-sm text-[var(--fg-muted)] leading-relaxed">
            {mounted
              ? greetingInfo.subtext
              : "Ready to practice? Let's write some code today."}
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="shrink-0 flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-10 px-4 rounded-xl shadow-xs border border-amber-400/30 cursor-pointer"
          >
            <Link href="/courses">
              Continue Practice <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
