import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Code2, Sparkles, Star, BookOpen, Trophy, Play } from "lucide-react";

const stats = [
  { value: "50K+", label: "Learners" },
  { value: "200+", label: "Exercises" },
  { value: "9", label: "Courses" },
  { value: "4.9", label: "Rating" },
];

const highlights = [
  { icon: <Code2 className="w-5 h-5" />, text: "Live Code Editor" },
  { icon: <Trophy className="w-5 h-5" />, text: "Earn XP & Badges" },
  { icon: <BookOpen className="w-5 h-5" />, text: "Structured Learning" },
];

function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[var(--bg-page)] flex flex-col">
      {/* ── Background layers ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern — uses hero-grid class for light/dark adaptation in CSS */}
        <div
          className="hero-grid absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(oklch(1 0 0 / 0.05) 1px, transparent 1px), linear-gradient(to right, oklch(1 0 0 / 0.05) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Amber radial glow top center */}
        <div
          className="hero-glow-amber absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(ellipse, oklch(0.76 0.18 85) 0%, transparent 70%)" }}
        />

        {/* Violet glow bottom right */}
        <div
          className="hero-glow-violet absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-12 blur-[100px]"
          style={{ background: "radial-gradient(ellipse, oklch(0.65 0.22 265) 0%, transparent 70%)" }}
        />

        {/* Floating code symbols — hero-symbol for light/dark opacity control */}
        <div className="hero-symbol absolute top-32 left-[8%] text-amber-400/10 dark:text-amber-400/10 text-6xl font-mono font-black select-none animate-float" style={{ animationDelay: "0.5s" }}>{"<>"}</div>
        <div className="hero-symbol absolute top-[45%] left-[5%] text-violet-400/10 dark:text-violet-400/10 text-5xl font-mono font-black select-none animate-float" style={{ animationDelay: "1.2s" }}>{"{ }"}</div>
        <div className="hero-symbol absolute top-24 right-[10%] text-amber-400/10 dark:text-amber-400/10 text-5xl font-mono font-black select-none animate-float" style={{ animationDelay: "0.8s" }}>{"()=>"}</div>
        <div className="hero-symbol absolute top-[60%] right-[6%] text-emerald-400/10 dark:text-emerald-400/10 text-4xl font-mono font-black select-none animate-float" style={{ animationDelay: "1.5s" }}>{"[ ]"}</div>
        <div className="hero-symbol absolute bottom-32 left-[15%] text-violet-400/10 dark:text-violet-400/10 text-5xl font-mono font-black select-none animate-float" style={{ animationDelay: "0.3s" }}>{"#"}</div>
        <div className="hero-symbol absolute bottom-48 right-[20%] text-amber-400/10 dark:text-amber-400/10 text-4xl font-mono font-black select-none animate-float" style={{ animationDelay: "2s" }}>{"</>"}</div>
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 pt-24 pb-16 text-center">
        {/* Eyebrow chip */}
        <div className="chip mb-8 animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5" />
          The #1 Platform to Learn Coding Interactively
        </div>

        {/* Main Headline */}
        <h1 className="animate-fade-in-up animate-delay-100 font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-5xl">
          <span className="gradient-text-hero">Master Coding</span>
          <br />
          <span className="text-[var(--fg)] opacity-90">One Line at a Time</span>
        </h1>

        {/* Subheading */}
        <p className="animate-fade-in-up animate-delay-200 mt-8 text-lg sm:text-xl md:text-2xl text-[var(--fg-muted)] max-w-2xl leading-relaxed font-light">
          Learn to code with hands-on exercises, instant feedback, and a
          gamified experience that keeps you motivated.
        </p>

        {/* Highlights */}
        <div className="animate-fade-in-up animate-delay-300 flex flex-wrap items-center justify-center gap-4 mt-8">
          {highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-[var(--fg-muted)] text-sm font-medium">
              <span className="text-amber-500 dark:text-amber-400">{h.icon}</span>
              {h.text}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animate-delay-300 flex flex-wrap gap-4 mt-10 justify-center">
          <Button
            asChild
            size="lg"
            className="gradient-brand text-[oklch(0.1_0.005_264)] font-semibold text-base px-8 h-12 shadow-xl shadow-amber-400/25 hover:opacity-90 transition-opacity border-0"
          >
            <Link href="/sign-up" className="flex items-center gap-2">
              Start Learning Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="text-base px-8 h-12 border-[var(--border-strong)] text-[var(--fg-muted)] hover:text-[var(--fg)] bg-[var(--bg-card)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] transition-all duration-200 shadow-sm"
          >
            <Link href="/courses" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Browse Courses
            </Link>
          </Button>
        </div>

        {/* Social proof */}
        <p className="animate-fade-in-up animate-delay-400 mt-6 text-sm text-[var(--fg-subtle)] flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
          Trusted by 50,000+ developers worldwide · No credit card required
        </p>

        {/* Stats Bar */}
        <div className="animate-fade-in-up animate-delay-400 mt-16 grid grid-cols-2 sm:grid-cols-4 divide-x divide-[var(--border-default)] w-full max-w-2xl rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[var(--shadow-card)]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-5 hover:bg-[var(--bg-elevated)] transition-colors"
            >
              <span className="text-2xl font-bold gradient-text-brand">{stat.value}</span>
              <span className="text-xs text-[var(--fg-subtle)] mt-1 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade — theme-aware */}
      <div
        className="hero-fade-bottom absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg-page), transparent)" }}
      />
    </section>
  );
}

export default Hero;
