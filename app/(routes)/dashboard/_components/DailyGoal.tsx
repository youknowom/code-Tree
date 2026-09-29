"use client";

import React, { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Target, CheckCircle2, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DailyGoal() {
  const { userDetail } = useContext(UserDetailContext);
  const points = userDetail?.points || 0;
  
  // Daily target is 50 XP (1 completed exercise)
  const targetXp = 50;
  // Compute progress towards current 50 XP block
  const currentBlockProgress = points > 0 ? (points % targetXp === 0 ? targetXp : points % targetXp) : 0;
  const isGoalReached = points > 0;
  const progressPercent = Math.min(100, Math.round((currentBlockProgress / targetXp) * 100));

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--fg)]">Daily Practice Goal</h3>
            <p className="text-xs text-[var(--fg-subtle)]">50 XP per day</p>
          </div>
        </div>
        {isGoalReached ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
            <CheckCircle2 className="w-3 h-3" /> Reached
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            <Flame className="w-3 h-3" /> In Progress
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 mb-4">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-[var(--fg-muted)]">Progress</span>
          <span className="text-[var(--fg)]">{currentBlockProgress} / {targetXp} XP</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[var(--border-default)] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
        <p className="text-xs text-[var(--fg-subtle)]">Solve 1 exercise to keep your skills sharp.</p>
        <Link
          href="/courses"
          className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 shrink-0 ml-2"
        >
          Practice <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
