"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Image from "next/image";
import { MailCheck } from "lucide-react";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl bg-white/4 border border-white/10 text-white/90 placeholder:text-white/25 outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/15 transition-all text-sm";

const labelClass = "text-sm font-semibold text-white/70 block mb-1.5";

const submitClass =
  "w-full py-3 rounded-xl gradient-brand text-[oklch(0.1_0.005_264)] font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-amber-400/20";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[oklch(0.09_0.008_264)] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(to right, oklch(1 0 0 / 0.5) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-20 blur-[100px]"
          style={{ background: "radial-gradient(ellipse, oklch(0.76 0.18 85) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-white/10 mb-4 flex items-center justify-center bg-amber-400/10">
            <Image src="/logo.png" alt="logo" width={44} height={44} className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold gradient-text-brand">Create your account</h1>
          <p className="text-sm text-white/40 mt-1">Start learning for free today</p>
        </div>

        <SignUp.Root>
          {/* === STEP 1: Registration === */}
          <SignUp.Step
            name="start"
            className="rounded-2xl border border-white/8 bg-[oklch(0.12_0.01_264)] p-6 sm:p-8 space-y-5"
          >
            <Clerk.GlobalError className="block text-xs text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-xl px-4 py-2.5" />

            {/* Google Signup */}
            <Clerk.Connection
              name="google"
              className="flex w-full items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 font-semibold text-sm hover:bg-white/8 hover:border-white/15 hover:text-white transition-all duration-200"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </Clerk.Connection>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/8" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 text-xs text-white/30 bg-[oklch(0.12_0.01_264)]">
                  or with email
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <Clerk.Field name="emailAddress" className="space-y-0">
                <Clerk.Label className={labelClass}>Email address</Clerk.Label>
                <Clerk.Input type="email" required className={inputClass} placeholder="you@example.com" />
                <Clerk.FieldError className="text-xs text-rose-400 mt-1 block" />
              </Clerk.Field>

              <Clerk.Field name="password" className="space-y-0">
                <Clerk.Label className={labelClass}>Password</Clerk.Label>
                <Clerk.Input type="password" required className={inputClass} placeholder="Create a strong password" />
                <Clerk.FieldError className="text-xs text-rose-400 mt-1 block" />
              </Clerk.Field>
            </div>

            <SignUp.Action submit className={submitClass}>
              Create Account — It&apos;s Free
            </SignUp.Action>

            <p className="text-center text-sm text-white/40">
              Already have an account?{" "}
              <Clerk.Link
                navigate="sign-in"
                className="font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                Sign in
              </Clerk.Link>
            </p>
          </SignUp.Step>

          {/* === STEP 2: Email Verification === */}
          <SignUp.Step
            name="verifications"
            className="rounded-2xl border border-white/8 bg-[oklch(0.12_0.01_264)] p-6 sm:p-8 space-y-5"
          >
            <div className="flex flex-col items-center text-center mb-2">
              <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4">
                <MailCheck className="w-7 h-7 text-amber-400" />
              </div>
              <h2 className="text-lg font-bold text-white">Check your email</h2>
              <p className="text-sm text-white/40 mt-1">
                We sent a verification code to your email
              </p>
            </div>

            <Clerk.GlobalError className="block text-xs text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-xl px-4 py-2.5" />

            <SignUp.Strategy name="email_code">
              <Clerk.Field name="code" className="space-y-0">
                <Clerk.Label className={labelClass}>Verification Code</Clerk.Label>
                <Clerk.Input type="otp" required className={inputClass} placeholder="Enter 6-digit code" />
                <Clerk.FieldError className="text-xs text-rose-400 mt-1 block" />
              </Clerk.Field>

              <SignUp.Action submit className={submitClass}>
                Verify Email
              </SignUp.Action>
            </SignUp.Strategy>

            <p className="text-center text-sm text-white/40">
              <Clerk.Link
                navigate="sign-in"
                className="font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                Back to sign in
              </Clerk.Link>
            </p>
          </SignUp.Step>

          {/* === STEP 3: Continue Registration === */}
          <SignUp.Step
            name="continue"
            className="rounded-2xl border border-white/8 bg-[oklch(0.12_0.01_264)] p-6 sm:p-8 space-y-5"
          >
            <div className="text-center mb-2">
              <h2 className="text-lg font-bold text-white">Almost there!</h2>
              <p className="text-sm text-white/40 mt-1">Choose a username to finish setup</p>
            </div>

            <Clerk.GlobalError className="block text-xs text-rose-400 bg-rose-400/10 border border-rose-400/20 rounded-xl px-4 py-2.5" />

            <Clerk.Field name="username" className="space-y-0">
              <Clerk.Label className={labelClass}>Username</Clerk.Label>
              <Clerk.Input type="text" required className={inputClass} placeholder="coolcoder42" />
              <Clerk.FieldError className="text-xs text-rose-400 mt-1 block" />
            </Clerk.Field>

            <SignUp.Action submit className={submitClass}>
              Complete Setup
            </SignUp.Action>

            <p className="text-center text-sm text-white/40">
              <Clerk.Link
                navigate="sign-in"
                className="font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                Back to sign in
              </Clerk.Link>
            </p>
          </SignUp.Step>
        </SignUp.Root>
      </div>
    </div>
  );
}
