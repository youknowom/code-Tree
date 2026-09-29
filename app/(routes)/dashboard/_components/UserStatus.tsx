"use client";

import { useSession } from "next-auth/react";
import React, { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Star, Flame, Award, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function UserStatus() {
  const { data: session } = useSession();
  const user = session?.user;
  const { userDetail } = useContext(UserDetailContext);

  const points = userDetail?.points || 0;
  let badgesCount = 0;
  if (points >= 20) badgesCount++;
  if (points >= 100) badgesCount++;
  if (points >= 250) badgesCount++;
  if (points >= 500) badgesCount++;
  if (points >= 1000) badgesCount++;

  const currentLevel = points > 0 ? Math.floor(points / 100) + 1 : 1;

  const stats = [
    {
      icon: <Star className="w-4 h-4" />,
      value: points,
      label: "Total XP",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      icon: <Award className="w-4 h-4" />,
      value: badgesCount,
      label: "Badges",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
    {
      icon: <Flame className="w-4 h-4" />,
      value: `Lvl ${currentLevel}`,
      label: "Skill Rank",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden shadow-xs">
      {/* User info header */}
      <div className="flex items-center gap-3 p-4 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/30">
        <div className="relative shrink-0">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={40}
              height={40}
              className="rounded-xl object-cover ring-1 ring-[var(--border-default)]"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-bold text-sm text-amber-500">
              {user?.name?.[0]?.toUpperCase() || "L"}
            </div>
          )}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[var(--bg-card)]" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-[var(--fg)] truncate">
            {user?.name || "Active Learner"}
          </p>
          <p className="text-xs text-[var(--fg-subtle)] truncate">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="p-4 grid grid-cols-3 gap-2.5">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl ${stat.bg} border ${stat.border}`}
          >
            <span className={stat.color}>{stat.icon}</span>
            <span className="text-lg font-extrabold text-[var(--fg)] font-mono">
              {stat.value}
            </span>
            <span className="text-[10px] font-semibold text-[var(--fg-subtle)] text-center leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
