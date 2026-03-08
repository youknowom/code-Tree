"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Sparkles, Lock, Zap, Trophy, Check } from "lucide-react";

function UpgradeToPro() {
  const { has } = useAuth();
  const hasPremiumAccess = has && has({ plan: "pro" });

  const proFeatures = [
    { icon: <Lock className="w-3.5 h-3.5" />, text: "Unlock all chapters" },
    { icon: <Sparkles className="w-3.5 h-3.5" />, text: "Exclusive content" },
    { icon: <Zap className="w-3.5 h-3.5" />, text: "Priority support" },
    { icon: <Trophy className="w-3.5 h-3.5" />, text: "Earn more XP" },
  ];

  if (hasPremiumAccess) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-400/20 bg-[var(--bg-card)]">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.76 0.18 85 / 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Popular badge */}
      <div className="absolute top-3 right-3">
        <span className="badge-pro">POPULAR</span>
      </div>

      <div className="relative z-10 p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-amber-400/20">
            <Sparkles className="w-5 h-5 text-[oklch(0.1_0.005_264)]" />
          </div>
          <div>
            <h3 className="font-bold text-[var(--fg)] text-base">Upgrade to Pro</h3>
            <p className="text-xs text-amber-400 font-medium">First 2 chapters free ✨</p>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-5">
          {proFeatures.map((feature, index) => (
            <li key={index} className="flex items-center gap-2.5 text-sm text-[var(--fg-muted)]">
              <div className="shrink-0 w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/25 flex items-center justify-center text-amber-400">
                {feature.icon}
              </div>
              {feature.text}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/pricing" className="block">
          <Button className="w-full gradient-brand text-[oklch(0.1_0.005_264)] font-semibold border-0 hover:opacity-90 transition-opacity shadow-lg shadow-amber-400/20">
            <Sparkles className="w-4 h-4 mr-1.5" />
            Upgrade Now
          </Button>
        </Link>

        <p className="text-center text-[10px] text-[var(--fg-subtle)] mt-3">
          Cancel anytime · 30-day money-back guarantee
        </p>
      </div>
    </div>
  );
}

export default UpgradeToPro;
