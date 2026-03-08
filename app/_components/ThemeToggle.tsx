"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => setMounted(true), []);
    if (!mounted) return <div className="w-9 h-9" />;

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
        text-[var(--fg-muted)] hover:text-[var(--fg)]
        bg-[var(--overlay-4)] hover:bg-[var(--overlay-8)]
        border border-[var(--border-default)]
        hover:border-[var(--border-strong)]"
        >
            <Sun
                className="w-4 h-4 absolute transition-all duration-300"
                style={{ opacity: isDark ? 0 : 1, transform: isDark ? "rotate(-90deg) scale(0.7)" : "rotate(0deg) scale(1)" }}
            />
            <Moon
                className="w-4 h-4 absolute transition-all duration-300"
                style={{ opacity: isDark ? 1 : 0, transform: isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.7)" }}
            />
        </button>
    );
}
