import type { Metadata } from "next";
import React from "react";
import {
  CheckCircle2,
  Sparkles,
  Zap,
  Trophy,
  Lock,
  Unlock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start learning for free. Upgrade to CodeTree Pro for unlimited course access, exclusive content, more XP rewards, and priority support. Simple, transparent pricing.",
  alternates: { canonical: "/pricing" },
};

function Pricing() {
  const features = [
    {
      title: "Unlimited Course Access",
      description: "Access all courses and future releases",
      icon: <Unlock className="w-5 h-5" />,
      color: "text-amber-400",
      bg: "bg-amber-400/8",
      border: "border-amber-400/15",
    },
    {
      title: "Exclusive Content",
      description: "Premium exercises and advanced topics",
      icon: <Sparkles className="w-5 h-5" />,
      color: "text-violet-400",
      bg: "bg-violet-400/8",
      border: "border-violet-400/15",
    },
    {
      title: "Priority Support",
      description: "Get help faster with dedicated support",
      icon: <Zap className="w-5 h-5" />,
      color: "text-sky-400",
      bg: "bg-sky-400/8",
      border: "border-sky-400/15",
    },
    {
      title: "Earn More XP",
      description: "Unlock achievements and compete on leaderboards",
      icon: <Trophy className="w-5 h-5" />,
      color: "text-emerald-400",
      bg: "bg-emerald-400/8",
      border: "border-emerald-400/15",
    },
  ];

  const freeFeatures = [
    "First 2 chapters of every course",
    "Basic exercises and tutorials",
    "Community access",
    "Progress tracking",
  ];

  const proFeatures = [
    "All course chapters unlocked",
    "Unlimited exercises & challenges",
    "Premium content & updates",
    "Priority support",
    "Exclusive community access",
    "Downloadable resources",
    "Certificate of completion",
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[var(--border-default)]">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(to right, oklch(1 0 0 / 0.5) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-[100px]"
            style={{ background: "radial-gradient(ellipse, oklch(0.76 0.18 85) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <div className="chip mx-auto mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Simple Pricing
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--fg)] mb-5 leading-tight">
            Choose Your{" "}
            <span className="gradient-text-brand">Learning Path</span>
          </h1>
          <p className="text-lg text-[var(--fg-muted)] max-w-xl mx-auto">
            Start for free. Upgrade to Pro for unlimited access to all courses and exclusive content.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col gap-3 p-5 rounded-2xl border ${feature.border} bg-[var(--bg-card)] card-hover`}
            >
              <div className={`w-11 h-11 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center ${feature.color}`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--fg)] mb-1">{feature.title}</h3>
                <p className="text-xs text-[var(--fg-subtle)] leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Plan Cards — Free + Pro (no Clerk PricingTable, both styled dark) */}
        <div className="grid md:grid-cols-2 gap-5 items-stretch">
          {/* ── Free Plan ── */}
          <div className="flex flex-col p-6 sm:p-8 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 rounded-xl bg-white/6 border border-[var(--border-strong)] flex items-center justify-center">
                <Lock className="w-5 h-5 text-[var(--fg-subtle)]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Free</h3>
                <p className="text-sm text-[var(--fg-subtle)]">Perfect for getting started</p>
              </div>
            </div>

            {/* Price */}
            <div className="py-5 border-b border-[var(--border-default)] mb-5">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-[var(--fg-subtle)] text-sm">/ forever</span>
              </div>
              <p className="text-xs text-[var(--fg-subtle)] mt-1">No credit card required</p>
            </div>

            {/* Features */}
            <ul className="space-y-3 flex-1 mb-6">
              {freeFeatures.map((feat, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-sm text-[var(--fg-muted)]">{feat}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/sign-up"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[var(--border-strong)] bg-white/5 text-[var(--fg-muted)] text-sm font-semibold hover:bg-[var(--overlay-12)] hover:text-white hover:border-white/20 transition-all"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ── Pro Plan ── */}
          <div className="relative flex flex-col p-6 sm:p-8 rounded-2xl border border-amber-400/30 bg-[var(--bg-card)] overflow-hidden">
            {/* Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.76 0.18 85 / 0.1) 0%, transparent 70%)",
              }}
            />

            {/* Popular badge */}
            <div className="absolute top-4 right-4">
              <span className="badge-pro">POPULAR</span>
            </div>

            <div className="relative z-10 flex flex-col flex-1">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-amber-400/20">
                  <Sparkles className="w-5 h-5 text-[oklch(0.1_0.005_264)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Pro</h3>
                  <p className="text-sm text-amber-400 font-medium">Unlimited learning</p>
                </div>
              </div>

              {/* Price */}
              <div className="py-5 border-b border-amber-400/15 mb-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold gradient-text-brand">$7.99</span>
                  <span className="text-[var(--fg-subtle)] text-sm">/ month</span>
                </div>
                <p className="text-xs text-[var(--fg-subtle)] mt-1">Billed monthly · Cancel anytime</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-6">
                {proFeatures.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-sm text-white/75 font-medium">{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/sign-up"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl gradient-brand text-[oklch(0.1_0.005_264)] text-sm font-bold hover:opacity-90 transition-opacity shadow-xl shadow-amber-400/25"
              >
                Upgrade to Pro
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center">
          <p className="text-sm text-[var(--fg-subtle)]">
            All plans include a 30-day money-back guarantee · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
