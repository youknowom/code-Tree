"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { Sparkles, TrendingUp } from "lucide-react";

function WelcomeBanner() {
  const { user } = useUser();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)]">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 100% 50%, oklch(0.76 0.18 85 / 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Decorative dots top-right */}
      <div className="absolute top-4 right-4 grid grid-cols-3 gap-1.5 opacity-20 pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-amber-400"
            style={{ opacity: 0.4 + (i % 3) * 0.2 }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 sm:p-8 flex items-center gap-6">
        {/* Avatar / Robot Indicator */}
        <div className="shrink-0 relative hidden sm:block">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-amber-400" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[oklch(0.12_0.01_264)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-900" />
          </div>
        </div>

        {/* Text */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--fg-subtle)] mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {greeting}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--fg)] truncate">
            Welcome back,{" "}
            <span className="gradient-text-brand">
              {user?.firstName ?? user?.fullName ?? "Learner"}
            </span>
            !
          </h2>
          <p className="text-[var(--fg-subtle)] mt-1.5 text-sm">
            Ready to continue your coding journey? Let&apos;s keep the streak going 🚀
          </p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBanner;
