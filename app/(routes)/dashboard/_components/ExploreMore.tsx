"use client";

import React from "react";
import { Code2, Play, Users, Smartphone } from "lucide-react";

const ExploreMoreOptions = [
  {
    id: 1,
    title: "Quiz Pack",
    desc: "Practice what you learned with bite-sized code challenges.",
    icon: <Code2 className="w-6 h-6" />,
    color: "text-amber-400",
    bg: "bg-amber-400/8",
    border: "border-amber-400/15",
  },
  {
    id: 2,
    title: "Video Courses",
    desc: "Learn with structured video lessons taught step-by-step.",
    icon: <Play className="w-6 h-6" />,
    color: "text-violet-400",
    bg: "bg-violet-400/8",
    border: "border-violet-400/15",
  },
  {
    id: 3,
    title: "Community Projects",
    desc: "Build real-world apps by collaborating with the community.",
    icon: <Users className="w-6 h-6" />,
    color: "text-emerald-400",
    bg: "bg-emerald-400/8",
    border: "border-emerald-400/15",
  },
  {
    id: 4,
    title: "Explore Apps",
    desc: "Try prebuilt apps, explore demos, and build them yourself.",
    icon: <Smartphone className="w-6 h-6" />,
    color: "text-sky-400",
    bg: "bg-sky-400/8",
    border: "border-sky-400/15",
  },
];

function ExploreMore() {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-white">Explore More</h2>
        <p className="text-sm text-[var(--fg-subtle)] mt-0.5">Discover what else you can do</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ExploreMoreOptions.map((option) => (
          <div
            key={option.id}
            className={`group flex items-start gap-4 p-5 rounded-2xl border ${option.border} bg-[var(--bg-card)] card-hover cursor-pointer`}
          >
            <div className={`shrink-0 w-12 h-12 rounded-xl ${option.bg} border ${option.border} flex items-center justify-center ${option.color} transition-transform duration-300 group-hover:scale-110`}>
              {option.icon}
            </div>
            <div>
              <h3 className="font-semibold text-[var(--fg)] mb-1 group-hover:text-amber-400 transition-colors">
                {option.title}
              </h3>
              <p className="text-sm text-[var(--fg-subtle)] leading-relaxed">{option.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExploreMore;
