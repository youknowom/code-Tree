import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, Code2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(to right, oklch(1 0 0 / 0.5) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: "radial-gradient(ellipse, oklch(0.76 0.18 85) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 text-center">
        {/* 404 visual */}
        <div className="mb-6 relative inline-block">
          <div className="text-[140px] sm:text-[180px] font-black leading-none gradient-text-brand opacity-20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-3xl gradient-brand flex items-center justify-center shadow-2xl shadow-amber-400/30">
              <Code2 className="w-10 h-10 text-[oklch(0.1_0.005_264)]" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--fg)] mb-3">
          Page not found
        </h1>
        <p className="text-[var(--fg-subtle)] text-base mb-8 max-w-sm">
          Looks like this path doesn&apos;t exist. Let&apos;s get you back on track 🚀
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            asChild
            className="gradient-brand text-[oklch(0.1_0.005_264)] font-semibold border-0 hover:opacity-90 shadow-lg shadow-amber-400/20 gap-2"
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-white/4 border-[var(--border-strong)] text-[var(--fg-muted)] hover:bg-[var(--overlay-8)] hover:text-white hover:border-white/20 gap-2"
          >
            <Link href="/courses">
              <Search className="w-4 h-4" />
              Browse Courses
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
