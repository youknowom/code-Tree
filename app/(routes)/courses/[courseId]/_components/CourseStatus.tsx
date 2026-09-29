"use client";

import React, { useEffect, useState } from "react";
import { Course } from "../../_components/CourseList";
import {
  BookOpen,
  Star,
  TrendingUp,
  Award,
  ShieldCheck,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  courseDetail: Course | undefined;
  loading: boolean;
};

export default function CourseStatus({ courseDetail, loading }: Props) {
  const [counts, setCounts] = useState({
    totalExce: 0,
    totalXp: 0,
  });

  useEffect(() => {
    if (courseDetail) getCounts();
  }, [courseDetail]);

  const getCounts = () => {
    let totalExercises = 0;
    let totalXp = 0;

    courseDetail?.chapters?.forEach((chapter: any) => {
      const exercises = chapter?.exercises || [];
      totalExercises += exercises.length;

      exercises.forEach((exc: any) => {
        totalXp += exc?.xp || 0;
      });
    });

    setCounts({
      totalExce: totalExercises,
      totalXp: totalXp,
    });
  };

  const updateProgress = (currentValue: number, totalValue: number) => {
    if (currentValue && totalValue) {
      return (currentValue * 100) / totalValue;
    }
    return 0;
  };

  const exerciseProgress = updateProgress(
    courseDetail?.completedExcercises?.length ?? 0,
    counts?.totalExce
  );

  const xpProgress = updateProgress(
    courseDetail?.courseEnrolledInfo?.xpEarned ?? 0,
    counts.totalXp
  );

  const certificate = courseDetail?.certificate;

  const progressItems = [
    {
      label: "Challenges Solved",
      icon: <BookOpen className="w-3.5 h-3.5" />,
      current: courseDetail?.completedExcercises?.length || 0,
      total: counts.totalExce,
      value: exerciseProgress,
      color: "text-sky-500",
      bg: "bg-sky-500/10",
      border: "border-sky-500/20",
    },
    {
      label: "Track XP Earned",
      icon: <Star className="w-3.5 h-3.5" />,
      current: courseDetail?.courseEnrolledInfo?.xpEarned || 0,
      total: counts.totalXp,
      value: xpProgress,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      suffix: " XP",
    },
  ];

  return (
    <div className="space-y-4">
      {/* ── Progress Card ── */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden shadow-xs">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h2 className="font-bold text-sm text-[var(--fg)]">Track Progress</h2>
        </div>

        {/* Progress items */}
        <div className="p-5 space-y-4">
          {progressItems.map((item, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[var(--fg)] flex items-center gap-1.5">
                  <span className={`${item.color}`}>{item.icon}</span>
                  {item.label}
                </span>
                <span className="font-mono text-[var(--fg-subtle)]">
                  {item.current}
                  {item.suffix ?? ""} / {item.total}
                  {item.suffix ?? ""}
                </span>
              </div>

              <div className="h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden border border-[var(--border-subtle)]">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>

              <div className="flex justify-end">
                <span className="text-[10px] text-[var(--fg-subtle)] font-medium">
                  {Math.round(item.value)}% complete
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Certificate Status Card ── */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden shadow-xs p-5 space-y-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              certificate
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
            }`}
          >
            {certificate ? (
              <ShieldCheck className="w-5 h-5" />
            ) : (
              <Award className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-bold text-[var(--fg-muted)]">
              Accreditation
            </div>
            <div className="text-sm font-bold text-[var(--fg)]">
              {certificate ? "Certificate Issued" : "Certificate Eligible"}
            </div>
          </div>
        </div>

        {certificate ? (
          <div className="space-y-2.5 pt-1">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Verified Credential:{" "}
                <span className="font-mono font-bold">{certificate.certificateId}</span>
              </span>
            </div>

            <Button
              asChild
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs h-9 rounded-xl cursor-pointer shadow-sm"
            >
              <Link href={`/verify/${certificate.certificateId}`} target="_blank">
                View & Share Certificate <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-2 text-xs text-[var(--fg-muted)] pt-1">
            <p className="leading-relaxed">
              Complete the curriculum and pass the Final Certification Exam with{" "}
              <span className="font-bold text-amber-400">
                {courseDetail?.passingScore || 70}%
              </span>{" "}
              or higher to earn your verified credential.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
