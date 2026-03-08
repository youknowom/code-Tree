import { Progress } from "@/components/ui/progress";
import React, { useEffect, useState } from "react";
import { Course } from "../../_components/CourseList";
import { BookOpen, Star, TrendingUp } from "lucide-react";

type Props = {
  courseDetail: Course | undefined;
  loading: boolean;
};

function CourseStatus({ courseDetail, loading }: Props) {
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

  const UpdateProgress = (currentValue: number, totalValue: number) => {
    if (currentValue && totalValue) {
      return (currentValue * 100) / totalValue;
    }
    return 0;
  };

  const exerciseProgress = UpdateProgress(
    courseDetail?.completedExcercises?.length ?? 0,
    counts?.totalExce
  );

  const xpProgress = UpdateProgress(
    courseDetail?.courseEnrolledInfo?.xpEarned ?? 0,
    counts.totalXp
  );

  const progressItems = [
    {
      label: "Exercises",
      icon: <BookOpen className="w-4 h-4" />,
      current: courseDetail?.completedExcercises?.length || 0,
      total: counts.totalExce,
      value: exerciseProgress,
      color: "text-violet-400",
      bg: "bg-violet-400/8",
      border: "border-violet-400/15",
    },
    {
      label: "XP Earned",
      icon: <Star className="w-4 h-4" />,
      current: courseDetail?.courseEnrolledInfo?.xpEarned || 0,
      total: counts.totalXp,
      value: xpProgress,
      color: "text-amber-400",
      bg: "bg-amber-400/8",
      border: "border-amber-400/15",
      suffix: " XP",
    },
  ];

  return (
    <div className="rounded-2xl border border-white/8 bg-[oklch(0.12_0.01_264)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/6">
        <div className="w-9 h-9 rounded-xl bg-amber-400/8 border border-amber-400/15 flex items-center justify-center">
          <TrendingUp className="w-4.5 h-4.5 text-amber-400" />
        </div>
        <h2 className="font-bold text-white">Your Progress</h2>
      </div>

      {/* Progress items */}
      <div className="p-5 space-y-5">
        {progressItems.map((item, i) => (
          <div key={i}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-lg ${item.bg} border ${item.border} flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-white/80">{item.label}</span>
              </div>
              <span className="text-xs font-bold text-white/50">
                {item.current}
                {item.suffix ?? ""} / {item.total}
                {item.suffix ?? ""}
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/6 overflow-hidden">
              <div
                className="h-full rounded-full gradient-brand transition-all duration-700"
                style={{ width: `${item.value}%` }}
              />
            </div>
            <div className="flex justify-end mt-1">
              <span className="text-[10px] text-white/30 font-medium">
                {Math.round(item.value)}% complete
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseStatus;
