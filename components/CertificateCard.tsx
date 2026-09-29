"use client";

import React, { useRef, useState } from "react";
import {
  CheckCircle2,
  Copy,
  Download,
  Linkedin,
  Printer,
  Share2,
  ShieldCheck,
  ExternalLink,
  Check,
  CheckCheck,
} from "lucide-react";
import { toast } from "sonner";
import CodeTreeLogo from "./CodeTreeLogo";

export interface CertificateData {
  certificateId: string;
  learnerName: string;
  courseTitle: string;
  score?: number;
  issuedAt: string | Date;
  instructor?: string;
  duration?: string;
  skillsCovered?: string[];
  verificationCode?: string;
}

interface CertificateCardProps {
  certificate: CertificateData;
  isPublicVerification?: boolean;
}

export default function CertificateCard({
  certificate,
  isPublicVerification = false,
}: CertificateCardProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const issuedDateObj = new Date(certificate.issuedAt);
  const issueDate = issuedDateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const issueMonth = issuedDateObj.getMonth() + 1;
  const issueYear = issuedDateObj.getFullYear();

  const verificationUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify/${certificate.certificateId}`
      : `/verify/${certificate.certificateId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    toast.success("Verification link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLinkedInAddToProfile = () => {
    const params = new URLSearchParams({
      startTask: "CERTIFICATION_NAME",
      name: certificate.courseTitle,
      organizationName: "CodeTree",
      issueYear: issueYear.toString(),
      issueMonth: issueMonth.toString(),
      certUrl: verificationUrl,
      certId: certificate.certificateId,
    });
    window.open(
      `https://www.linkedin.com/profile/add?${params.toString()}`,
      "_blank"
    );
  };

  const handleShareLinkedInFeed = () => {
    const title = encodeURIComponent(
      `Proud to share that I have earned my verified credential in ${certificate.courseTitle} from CodeTree!`
    );
    const url = encodeURIComponent(verificationUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
      "_blank"
    );
  };

  // Default fallback skills if none provided in certificate data
  const skills =
    certificate.skillsCovered && certificate.skillsCovered.length > 0
      ? certificate.skillsCovered
      : [
          "Supervised & Unsupervised Learning",
          "Feature Engineering & Data Pipelines",
          "Model Evaluation & Hyperparameter Tuning",
          "Algorithmic Problem Solving",
          "Production Code Quality",
        ];

  return (
    <div className="space-y-6">
      {/* ── Action Bar (only shown when not on public verification page, hidden on print) ── */}
      {!isPublicVerification && (
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/25">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--fg)] flex items-center gap-2">
                Verified Developer Credential
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30">
                  OFFICIAL
                </span>
              </div>
              <div className="text-xs text-[var(--fg-muted)] font-mono">
                Certificate ID: {certificate.certificateId}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[var(--border)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-card-hover)] text-[var(--fg)] transition-all cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[var(--fg-muted)]" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </button>

            <button
              onClick={handleLinkedInAddToProfile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0A66C2] hover:bg-[#084e96] text-white transition-all cursor-pointer shadow-xs"
              title="Add to your LinkedIn profile Licenses & Certifications section"
            >
              <Linkedin className="w-3.5 h-3.5 fill-current" />
              Add to LinkedIn
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
          </div>
        </div>
      )}

      {/* ── HACKERRANK-STYLE CLEAN CREDENTIAL DOCUMENT ── */}
      <div
        ref={certificateRef}
        id="printable-certificate"
        className="relative mx-auto w-full max-w-4xl aspect-[1.414/1] bg-white text-slate-900 rounded-lg p-6 sm:p-10 md:p-12 shadow-2xl border-[3px] border-[#059669] overflow-hidden select-none print:m-0 print:w-full print:h-full print:rounded-none print:shadow-none print:border-none flex flex-col justify-between"
      >
        {/* Subtle geometric double inner border */}
        <div className="absolute inset-2.5 sm:inset-3 border border-slate-200 pointer-events-none" />
        <div className="absolute inset-3.5 sm:inset-4 border border-slate-100 pointer-events-none" />

        {/* Crisp corner geometric marks */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 w-4 h-4 border-t-2 border-l-2 border-[#059669]" />
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-4 h-4 border-t-2 border-r-2 border-[#059669]" />
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 w-4 h-4 border-b-2 border-l-2 border-[#059669]" />
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-4 h-4 border-b-2 border-r-2 border-[#059669]" />


        {/* Clean Document Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none select-none">
          <span className="text-9xl font-black tracking-widest text-slate-900">
            CODETREE
          </span>
        </div>

        {/* Certificate Body Container */}
        <div className="relative z-10 h-full flex flex-col justify-between text-left">
          
          {/* Top Brand Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <div className="flex items-center gap-3">
              {/* Clean CodeTree Brand Logo */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                  C
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-slate-900 leading-tight">
                    Code<span className="text-emerald-600">Tree</span>
                  </span>
                  <span className="text-[9px] font-mono tracking-widest uppercase text-slate-500 font-semibold">
                    Skill Certification
                  </span>
                </div>
              </div>
            </div>

            {/* HackerRank-style certificate identification badge */}
            <div className="text-right">
              <div className="text-[10px] uppercase font-mono tracking-wider font-semibold text-slate-500">
                Official Credential
              </div>
              <div className="text-xs font-mono font-bold text-emerald-700">
                {certificate.certificateId}
              </div>
            </div>
          </div>

          {/* Certificate Main Copy */}
          <div className="my-auto py-4 space-y-4">
            <div className="text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase font-bold text-emerald-700">
              Certificate of Accomplishment
            </div>

            <div className="text-xs sm:text-sm text-slate-500 font-medium">
              This is to certify that
            </div>

            {/* Candidate Name */}
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight pb-1 border-b-2 border-slate-900 inline-block min-w-[280px]">
              {certificate.learnerName}
            </div>

            <div className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed pt-1">
              has successfully cleared the assessment for the skill{" "}
              <span className="text-base sm:text-lg md:text-xl font-bold text-slate-900 block mt-1">
                {certificate.courseTitle}
              </span>
            </div>

            {/* Skills Tested */}
            <div className="pt-2">
              <div className="text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 mb-1.5">
                Competencies & Skills Validated:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skills.slice(0, 5).map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Signature & Verification Block */}
          <div className="pt-5 border-t border-slate-200 grid grid-cols-3 items-end gap-4 text-xs">
            {/* Left: Issue Date & Verification details */}
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-medium">
                Issue Date
              </div>
              <div className="text-xs font-semibold text-slate-900 font-mono">
                {issueDate}
              </div>
              {certificate.score !== undefined && (
                <div className="text-[11px] text-slate-600 font-medium">
                  Assessment Score:{" "}
                  <span className="font-bold text-emerald-700 font-mono">
                    {certificate.score}%
                  </span>
                </div>
              )}
            </div>

            {/* Center: Verification Link & QR Representation */}
            <div className="flex flex-col items-center justify-center text-center space-y-1">
              {/* Clean vector QR icon representation */}
              <div className="w-12 h-12 p-1 bg-white border border-slate-300 rounded shadow-xs flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-slate-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  <line x1="17" y1="7" x2="17.01" y2="7"></line>
                  <line x1="7" y1="17" x2="7.01" y2="17"></line>
                  <line x1="17" y1="17" x2="17.01" y2="17"></line>
                </svg>
              </div>
              <div className="text-[9px] font-mono text-slate-500 font-medium tracking-tight truncate max-w-[200px]">
                Verify: codetree.dev/verify/{certificate.certificateId}
              </div>
            </div>

            {/* Right: Authorized Signature */}
            <div className="text-right space-y-1">
              {/* Professional handwritten vector signature */}
              <div className="inline-block">
                <svg
                  className="w-32 h-8 ml-auto text-slate-800"
                  viewBox="0 0 140 36"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 24 C18 12, 28 8, 38 18 C46 25, 48 30, 58 14 C65 2, 70 20, 82 22 C92 24, 105 10, 115 12 C122 14, 130 18, 135 15" />
                  <path d="M22 28 C45 26, 75 25, 110 24" />
                </svg>
              </div>
              <div className="h-px w-36 ml-auto bg-slate-300" />
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {certificate.instructor || "Dr. Sarah Chen"}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Head of Curriculum, CodeTree
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Print Specific Styles ── */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-certificate,
          #printable-certificate * {
            visibility: visible !important;
          }
          #printable-certificate {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 3rem !important;
            box-shadow: none !important;
            border: 2px solid #059669 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
}
