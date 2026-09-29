"use client";

import Link from "next/link";
import CodeTreeLogo from "@/components/CodeTreeLogo";
import { signIn } from "next-auth/react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (e) {
      setLoading(false);
      console.error("Sign-up failed:", e);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(var(--border-default) 1px, transparent 1px), linear-gradient(to right, var(--border-default) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[100px] opacity-20 dark:opacity-25"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.76 0.18 85) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Headline */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="mb-4">
            <CodeTreeLogo size="xl" showText={false} />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-amber-500 bg-amber-400/10 border border-amber-400/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 100% Free Account
          </div>
          <h1 className="text-2xl font-bold text-[var(--fg)] tracking-tight">Get Started with CodeTree</h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1">
            Create your account in seconds with Google
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[var(--shadow-lg)] p-6 sm:p-8 space-y-6">
          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-default)] hover:border-amber-400/50 text-[var(--fg)] font-semibold text-sm hover:bg-[var(--overlay-8)] transition-all duration-200 shadow-md group disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {loading ? "Connecting to Google..." : "Sign up with Google"}
          </button>

          {/* Perks */}
          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-[var(--fg-muted)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Full access to 100+ interactive exercises</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--fg-muted)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Track your learning streaks & earn XP</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--fg-muted)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>No credit card required ever</span>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-[var(--fg-subtle)] mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-amber-500 font-semibold hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
