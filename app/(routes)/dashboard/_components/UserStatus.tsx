"use client";

import { useUser } from "@clerk/nextjs";
import React, { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Star, Flame, Award, TrendingUp } from "lucide-react";

function UserStatus() {
  const { user } = useUser();
  const { userDetail } = useContext(UserDetailContext);

  const stats = [
    {
      icon: <Star className="w-5 h-5" />,
      value: userDetail?.points || 0,
      label: "Total Points",
      color: "text-amber-400",
      bg: "bg-amber-400/8",
      border: "border-amber-400/15",
    },
    {
      icon: <Award className="w-5 h-5" />,
      value: 20,
      label: "Badges",
      color: "text-violet-400",
      bg: "bg-violet-400/8",
      border: "border-violet-400/15",
    },
    {
      icon: <Flame className="w-5 h-5" />,
      value: 20,
      label: "Day Streak",
      color: "text-orange-400",
      bg: "bg-orange-400/8",
      border: "border-orange-400/15",
    },
  ];

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden">
      {/* User info header */}
      <div className="flex items-center gap-3 p-5 border-b border-[var(--border-subtle)]">
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center overflow-hidden">
            <TrendingUp className="w-6 h-6 text-amber-400" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[oklch(0.12_0.01_264)]" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--fg)]/90 truncate">
            {user?.fullName || "Learner"}
          </p>
          <p className="text-xs text-[var(--fg-subtle)] truncate">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="p-5 grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl ${stat.bg} border ${stat.border}`}
          >
            <span className={stat.color}>{stat.icon}</span>
            <span className="text-xl font-bold text-white">{stat.value}</span>
            <span className="text-[10px] font-medium text-[var(--fg-subtle)] text-center leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserStatus;
