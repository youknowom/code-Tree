import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

const SIZES = {
  sm: { icon: 24, text: "text-base", gap: "gap-2" },
  md: { icon: 32, text: "text-xl", gap: "gap-2.5" },
  lg: { icon: 40, text: "text-2xl", gap: "gap-3" },
  xl: { icon: 48, text: "text-3xl", gap: "gap-3.5" },
};

export default function CodeTreeLogo({
  className,
  size = "md",
  showText = true,
}: LogoProps) {
  const { icon, text, gap } = SIZES[size];

  return (
    <div className={cn("inline-flex items-center select-none group", gap, className)}>
      {/* Icon Mark */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105"
        style={{
          width: icon,
          height: icon,
        }}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle Ambient Background Squircle */}
          <rect
            width="48"
            height="48"
            rx="12"
            fill="url(#logo-bg-gradient)"
          />
          <rect
            x="0.5"
            y="0.5"
            width="47"
            height="47"
            rx="11.5"
            stroke="url(#logo-border-gradient)"
            strokeOpacity="0.4"
          />

          {/* Central Trunk / Stem */}
          <path
            d="M24 38V20"
            stroke="url(#trunk-gradient)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Left Branch Bracket: < */}
          <path
            d="M24 24L16 28L13 24"
            stroke="#f59e0b"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right Branch Bracket: > */}
          <path
            d="M24 24L32 28L35 24"
            stroke="#f59e0b"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Top Canopy Nodes (Tree Growth + Terminal Slash: /) */}
          <path
            d="M24 20L20 12"
            stroke="#fbbf24"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M24 20L28 12"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Glowing Canopy Apex Dot */}
          <circle cx="20" cy="11" r="2.5" fill="#fde68a" />
          <circle cx="28" cy="11" r="2.5" fill="#f59e0b" />
          <circle cx="12.5" cy="23.5" r="2" fill="#fbbf24" />
          <circle cx="35.5" cy="23.5" r="2" fill="#fbbf24" />

          {/* Gradients */}
          <defs>
            <linearGradient
              id="logo-bg-gradient"
              x1="0"
              y1="0"
              x2="48"
              y2="48"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1e180d" />
              <stop offset="1" stopColor="#0f0e0c" />
            </linearGradient>
            <linearGradient
              id="logo-border-gradient"
              x1="0"
              y1="0"
              x2="48"
              y2="48"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#f59e0b" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
            <linearGradient
              id="trunk-gradient"
              x1="24"
              y1="20"
              x2="24"
              y2="38"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fbbf24" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Typography */}
      {showText && (
        <span
          className={cn(
            "font-extrabold tracking-tight text-[var(--fg)] flex items-baseline",
            text
          )}
        >
          Code
          <span className="text-amber-500 dark:text-amber-400 ml-0.5">Tree</span>
        </span>
      )}
    </div>
  );
}
