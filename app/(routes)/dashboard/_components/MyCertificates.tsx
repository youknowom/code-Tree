"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Award,
  ShieldCheck,
  ExternalLink,
  Copy,
  Printer,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import CourseIcon from "@/components/CourseIcon";
import { Button } from "@/components/ui/button";

interface UserCertificate {
  id: number;
  certificateId: string;
  courseId: number;
  courseTitle: string;
  learnerName: string;
  score?: number;
  issuedAt: string;
  instructor?: string;
  duration?: string;
  skillsCovered?: string[];
  bannerImage?: string;
  level?: string;
  tags?: string;
}

export default function MyCertificates() {
  const [certificates, setCertificates] = useState<UserCertificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserCertificates();
  }, []);

  const fetchUserCertificates = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/certificate/user");
      setCertificates(res.data || []);
    } catch {
      // User might be unauthenticated or error
    } finally {
      setLoading(false);
    }
  };

  const handleCopyId = (certId: string) => {
    navigator.clipboard.writeText(certId);
    toast.success("Certificate ID copied to clipboard!");
  };

  const handleShareLinkedIn = (cert: UserCertificate) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = encodeURIComponent(`${origin}/verify/${cert.certificateId}`);
    const title = encodeURIComponent(
      `I earned a verified Certificate in ${cert.courseTitle} from CodeTree AI Academy!`
    );
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-6 bg-[var(--bg-elevated)] rounded-md w-48 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] h-44 animate-pulse space-y-3"
            >
              <div className="h-4 bg-[var(--bg-elevated)] rounded w-1/3" />
              <div className="h-6 bg-[var(--bg-elevated)] rounded w-3/4" />
              <div className="h-4 bg-[var(--bg-elevated)] rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--fg)]">
                Earned Credentials & Certificates
              </h3>
              <p className="text-xs text-[var(--fg-muted)] mt-1 max-w-lg leading-relaxed">
                Complete all challenges in any AI/ML or Software specialization track,
                pass the capstone certification exam with 70%+ score, and earn verified,
                tamper-proof credentials.
              </p>
            </div>
          </div>

          <Link
            href="/courses"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors shrink-0 shadow-xs"
          >
            Explore Certificate Tracks <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--fg)]">
              Earned Credentials & Certificates
            </h2>
            <p className="text-xs text-[var(--fg-muted)]">
              Official verifiable records of your technical accomplishments
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          {certificates.length} {certificates.length === 1 ? "Certificate" : "Certificates"}
        </span>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert) => {
          const dateStr = new Date(cert.issuedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <div
              key={cert.certificateId}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] p-5 shadow-xs hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              {/* Card Top */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <CourseIcon tag={cert.tags || cert.courseTitle} size={32} />

                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-[var(--fg)] line-clamp-1">
                    {cert.courseTitle}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[var(--fg-muted)] mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" /> {dateStr}
                    </span>
                    {cert.score !== undefined && (
                      <span className="font-mono text-emerald-400 font-semibold">
                        Score: {cert.score}%
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                  <div className="font-mono text-[var(--fg-muted)] truncate max-w-[200px]">
                    ID: <span className="text-[var(--fg)] font-medium">{cert.certificateId}</span>
                  </div>
                  <button
                    onClick={() => handleCopyId(cert.certificateId)}
                    className="p-1 text-[var(--fg-muted)] hover:text-emerald-400 transition-colors cursor-pointer"
                    title="Copy Certificate ID"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
                <Link
                  href={`/verify/${cert.certificateId}`}
                  target="_blank"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> View / Download PDF
                </Link>

                <button
                  onClick={() => handleShareLinkedIn(cert)}
                  className="p-1.5 rounded-lg text-[#70b5f9] hover:bg-[#0A66C2]/20 transition-colors cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
