import React from "react";
import { cn } from "@/lib/utils";

interface CourseIconProps {
  tag?: string;
  className?: string;
  size?: number;
}

export default function CourseIcon({
  tag = "",
  className,
  size = 32,
}: CourseIconProps) {
  const normalized = tag.toLowerCase().trim();

  // ── 1. React Official Atom ──
  if (normalized.includes("react")) {
    return (
      <div
        className={cn(
          "rounded-xl bg-[#20232A] flex items-center justify-center shrink-0 shadow-xs border border-[#61DAFB]/20 p-1.5",
          className
        )}
        style={{ width: size, height: size }}
        title="React 19"
      >
        <svg
          viewBox="-11.5 -10.23174 23 20.46348"
          fill="none"
          className="w-full h-full"
        >
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      </div>
    );
  }

  // ── 2. TypeScript Official Square ──
  if (normalized.includes("typescript") || normalized === "ts") {
    return (
      <div
        className={cn(
          "rounded-xl overflow-hidden shrink-0 shadow-xs border border-[#3178C6]/30",
          className
        )}
        style={{ width: size, height: size }}
        title="TypeScript"
      >
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <rect width="128" height="128" fill="#3178C6" />
          <path
            fill="#FFFFFF"
            d="M46.7 54.2V104H32.5V54.2H12.9V42h53.5v12.2H46.7zm21.4 34.2c3.7 3.3 9.1 5.6 15.3 5.6 7.6 0 11.8-3.6 11.8-8.8 0-5.1-3.6-7.8-12.7-11.5-12.7-5.1-18.7-10.7-18.7-20.7 0-11.4 9.4-19.6 24.3-19.6 7.8 0 14.8 2.3 19.3 5.7l-4.7 10.9c-3.6-2.6-8.5-4.5-14.4-4.5-6.7 0-10.6 3.4-10.6 8 0 4.8 3.5 7.1 12.8 11 13.5 5.5 18.7 11.6 18.7 21.6 0 12.3-9.5 20.6-26 20.6-8.9 0-17.1-2.9-21.7-6.9l4.6-11.4z"
          />
        </svg>
      </div>
    );
  }

  // ── 3. JavaScript Official Badge ──
  if (normalized.includes("javascript") || normalized === "js") {
    return (
      <div
        className={cn(
          "rounded-xl overflow-hidden shrink-0 shadow-xs border border-[#F7DF1E]/40",
          className
        )}
        style={{ width: size, height: size }}
        title="JavaScript"
      >
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <rect width="128" height="128" fill="#F7DF1E" />
          <path
            fill="#000000"
            d="M67.3 103.2c-5.7 3.4-13.2 5.8-21.7 5.8-17.8 0-26.6-9.9-26.6-25.5 0-15.3 9.4-25.2 24.5-25.2 7.7 0 14 2.2 18.4 5.2l-5.3 11.6c-3.2-2.1-7.8-3.7-12.9-3.7-7.9 0-11.9 5.3-11.9 12 0 7.4 4.5 12.4 12.6 12.4 3.7 0 7.3-.8 9.9-2.1l1 9.5zm41.7-38.3v27.2c0 9.7-4.4 15.6-13.6 17-6.3.9-12.8-.2-16.7-2l3.4-10.6c2.8 1.4 6.8 2.3 10.8 1.8 4-.5 5.2-2.8 5.2-6.9V64.9h10.9z"
          />
        </svg>
      </div>
    );
  }

  // ── 4. Python Official Intertwined Snakes ──
  if (normalized.includes("python") || normalized === "py") {
    return (
      <div
        className={cn(
          "rounded-xl bg-[#1e293b]/70 flex items-center justify-center shrink-0 shadow-xs border border-[#3776AB]/30 p-1.5",
          className
        )}
        style={{ width: size, height: size }}
        title="Python"
      >
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <path
            fill="#3776AB"
            d="M63.6 5.2c-29.3 0-27.5 12.7-27.5 12.7l.03 13.2h28.1v4H24.8s-19.6-2.2-19.6 27.4c0 29.6 17.1 28.6 17.1 28.6h10.2v-14.3s-.6-17.1 16.8-17.1h27.1s16.2.3 16.2-15.6V18.1S95.2 5.2 63.6 5.2zm-15.3 8.7a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4z"
          />
          <path
            fill="#FFD43B"
            d="M64.4 122.8c29.3 0 27.5-12.7 27.5-12.7l-.03-13.2H63.8v-4h39.4s19.6 2.2 19.6-27.4c0-29.6-17.1-28.6-17.1-28.6H95.5v14.3s.6 17.1-16.8 17.1H51.6s-16.2-.3-16.2 15.6v20.8s-2.8 14.1 29 14.1zm15.3-8.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4z"
          />
        </svg>
      </div>
    );
  }

  // ── 5. Next.js Official Logo ──
  if (normalized.includes("next")) {
    return (
      <div
        className={cn(
          "rounded-xl overflow-hidden shrink-0 shadow-xs border border-white/20 bg-black flex items-center justify-center p-1",
          className
        )}
        style={{ width: size, height: size }}
        title="Next.js"
      >
        <svg viewBox="0 0 180 180" fill="none" className="w-full h-full">
          <circle cx="90" cy="90" r="90" fill="black" />
          <path
            d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
            fill="white"
          />
          <rect x="115" y="54" width="12" height="72" fill="white" />
        </svg>
      </div>
    );
  }

  // ── 6. Tailwind CSS Official Waves ──
  if (normalized.includes("tailwind")) {
    return (
      <div
        className={cn(
          "rounded-xl bg-[#0F172A] flex items-center justify-center shrink-0 shadow-xs border border-[#38BDF8]/30 p-1.5",
          className
        )}
        style={{ width: size, height: size }}
        title="Tailwind CSS"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 6.00018C9.6 6.00018 8.1 7.20018 7.5 9.60018C8.4 8.40018 9.45 7.95018 10.65 8.25018C11.3346 8.42133 11.8242 8.91899 12.3667 9.47006C13.2504 10.3677 14.2854 11.4191 16.8 11.4191C19.2 11.4191 20.7 10.2191 21.3 7.81912C20.4 9.01912 19.35 9.46912 18.15 9.16912C17.4654 8.99797 16.9758 8.50031 16.4333 7.94924C15.5496 7.05164 14.5146 6.00018 12 6.00018ZM7.2 12.0002C4.8 12.0002 3.3 13.2002 2.7 15.6002C3.6 14.4002 4.65 13.9502 5.85 14.2502C6.5346 14.4213 7.02422 14.919 7.56672 15.4701C8.45044 16.3677 9.48542 17.4191 12 17.4191C14.4 17.4191 15.9 16.2191 16.5 13.8191C15.6 15.0191 14.55 15.4691 13.35 15.1691C12.6654 14.998 12.1758 14.5003 11.6333 13.9492C10.7496 13.0516 9.71458 12.0002 7.2 12.0002Z"
            fill="#38BDF8"
          />
        </svg>
      </div>
    );
  }

  // ── 7. HTML5 Official Shield ──
  if (normalized.includes("html")) {
    return (
      <div
        className={cn(
          "rounded-xl bg-[#1c1917] flex items-center justify-center shrink-0 shadow-xs border border-[#E44D26]/30 p-1.5",
          className
        )}
        style={{ width: size, height: size }}
        title="HTML5"
      >
        <svg viewBox="0 0 512 512" className="w-full h-full">
          <path fill="#E44D26" d="M107.6 441.7L67.1 0h377.8l-40.5 441.6L255.7 483z" />
          <path fill="#F16529" d="M256 446.5l117.2-32.5 34.3-375.3H256z" />
          <path
            fill="#EBEBEB"
            d="M256 195.8h-63.5l-4.4-49.3H256V97.3H135.9l12.7 143.5H256zm0 136.6l-54.6-14.7-3.5-39.2h-49.5l6.9 77.4 100.7 27.9z"
          />
          <path
            fill="#FFFFFF"
            d="M255.8 195.8h63.7l-6 67.2-57.7 15.6v48.6l100.8-27.9 14-152.8H255.8zm0-98.5v49.2h120.3l4.3-49.2z"
          />
        </svg>
      </div>
    );
  }

  // ── 8. CSS3 Official Shield ──
  if (normalized.includes("css")) {
    return (
      <div
        className={cn(
          "rounded-xl bg-[#0c1a2e] flex items-center justify-center shrink-0 shadow-xs border border-[#264DE4]/30 p-1.5",
          className
        )}
        style={{ width: size, height: size }}
        title="CSS3"
      >
        <svg viewBox="0 0 512 512" className="w-full h-full">
          <path fill="#264DE4" d="M107.6 441.7L67.1 0h377.8l-40.5 441.6L255.7 483z" />
          <path fill="#2965F1" d="M256 446.5l117.2-32.5 34.3-375.3H256z" />
          <path
            fill="#EBEBEB"
            d="M256 195.8h-60.6l-4.2-46.7H256V99.9H138.8l12.7 142.7H256zm0 136.6l-54.6-14.7-3.5-39.2h-49.5l6.9 77.4 100.7 27.9z"
          />
          <path
            fill="#FFFFFF"
            d="M255.8 242.5h58.3l-5.5 61.5-52.8 14.3v48.6l95.7-26.5 13.3-147.2H255.8zm0-142.6v46.7h114.6l4.2-46.7z"
          />
        </svg>
      </div>
    );
  }

  // ── 9. PyTorch Official Flame ──
  if (normalized.includes("pytorch")) {
    return (
      <div
        className={cn(
          "rounded-xl bg-[#2b1717] flex items-center justify-center shrink-0 shadow-xs border border-[#EE4C2C]/30 p-1.5",
          className
        )}
        style={{ width: size, height: size }}
        title="PyTorch"
      >
        <svg viewBox="0 0 128 128" className="w-full h-full">
          <path
            fill="#EE4C2C"
            d="M66.6 15.6L54.1 28.1l17.7 17.7c4.9 4.9 4.9 12.8 0 17.7-4.9 4.9-12.8 4.9-17.7 0L36.4 45.8c-14.7 14.7-14.7 38.6 0 53.3 14.7 14.7 38.6 14.7 53.3 0 14.7-14.7 14.7-38.6 0-53.3l-23.1-30.2z"
          />
          <circle cx="85.4" cy="28.1" r="7.4" fill="#EE4C2C" />
        </svg>
      </div>
    );
  }

  // ── 10. Machine Learning & Scikit-learn (Neural/Graph Node) ──
  if (
    normalized.includes("machine learning") ||
    normalized.includes("scikit") ||
    normalized.includes("data science")
  ) {
    return (
      <div
        className={cn(
          "rounded-xl bg-[#0b192c] flex items-center justify-center shrink-0 shadow-xs border border-[#38bdf8]/30 p-1.5",
          className
        )}
        style={{ width: size, height: size }}
        title="Machine Learning"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-[#38bdf8]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" fill="#38bdf8" fillOpacity="0.2" />
          <circle cx="6" cy="12" r="3" fill="#38bdf8" fillOpacity="0.2" />
          <circle cx="18" cy="19" r="3" fill="#38bdf8" fillOpacity="0.2" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      </div>
    );
  }

  // ── 11. Generative AI, LLM, RAG & Agents (Sparkle Transformer) ──
  if (
    normalized.includes("generative") ||
    normalized.includes("llm") ||
    normalized.includes("rag") ||
    normalized.includes("ai agent") ||
    normalized.includes("deep learning")
  ) {
    return (
      <div
        className={cn(
          "rounded-xl bg-gradient-to-tr from-purple-950 to-indigo-950 flex items-center justify-center shrink-0 shadow-xs border border-purple-500/40 p-1.5",
          className
        )}
        style={{ width: size, height: size }}
        title="Generative AI & LLMs"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-purple-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          <circle cx="12" cy="12" r="3" fill="#c084fc" fillOpacity="0.3" />
        </svg>
      </div>
    );
  }

  // ── Fallback Code Glyph ──
  return (
    <div
      className={cn(
        "rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0 shadow-xs font-mono font-bold text-xs",
        className
      )}
      style={{ width: size, height: size }}
    >
      &lt;/&gt;
    </div>
  );
}
