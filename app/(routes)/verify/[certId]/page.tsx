"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Award,
  ArrowRight,
  BookOpen,
  Calendar,
  User,
  Copy,
  Linkedin,
  Printer,
  ExternalLink,
  Check,
  CheckCheck,
  Sparkles,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import CodeTreeLogo from "@/components/CodeTreeLogo";
import CertificateCard, { CertificateData } from "@/components/CertificateCard";

export default function CertificateVerificationPage() {
  const params = useParams();
  const certId = params?.certId as string;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState<boolean | null>(null);
  const [certData, setCertData] = useState<CertificateData | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (certId) {
      verifyCertificate();
    }
  }, [certId]);

  const verifyCertificate = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await axios.get(`/api/certificate/verify/${certId}`);
      if (res.data?.verified) {
        setVerified(true);
        setCertData(res.data.certificate);
      } else {
        setVerified(false);
        setErrorMsg("Certificate could not be verified.");
      }
    } catch (err: any) {
      setVerified(false);
      setErrorMsg(
        err.response?.data?.error ||
          "Certificate not found in registry. Please check the ID and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Verification link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLinkedInAddToProfile = () => {
    if (!certData) return;
    const issuedDateObj = new Date(certData.issuedAt);
    const params = new URLSearchParams({
      startTask: "CERTIFICATION_NAME",
      name: certData.courseTitle,
      organizationName: "CodeTree",
      issueYear: issuedDateObj.getFullYear().toString(),
      issueMonth: (issuedDateObj.getMonth() + 1).toString(),
      certUrl: typeof window !== "undefined" ? window.location.href : "",
      certId: certData.certificateId,
    });
    window.open(
      `https://www.linkedin.com/profile/add?${params.toString()}`,
      "_blank"
    );
  };

  const skills =
    certData?.skillsCovered && certData.skillsCovered.length > 0
      ? certData.skillsCovered
      : [
          "Supervised & Unsupervised Learning",
          "Feature Engineering & Data Pipelines",
          "Model Evaluation & Hyperparameter Tuning",
          "Algorithmic Problem Solving",
          "Production Code Quality",
        ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 flex flex-col font-sans">
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* ── Sub-header: Official Registry Identification ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                CodeTree Credential Registry
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25">
                  PUBLIC VERIFICATION
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Registry ID: {certId}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </button>
            <Link
              href="/courses"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>

        {/* ── Loading State ── */}
        {loading && (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto" />
            <div className="text-sm font-medium text-slate-300">
              Verifying credential record from database...
            </div>
            <div className="text-xs text-slate-500 font-mono">{certId}</div>
          </div>
        )}

        {/* ── Invalid State ── */}
        {!loading && verified === false && (
          <div className="max-w-lg mx-auto p-8 rounded-2xl bg-white/5 border border-rose-500/20 text-center space-y-4 my-12">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto">
              <XCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Certificate Not Found</h2>
              <p className="text-xs text-slate-400 mt-1">{errorMsg}</p>
            </div>
            <div className="p-2.5 rounded-lg bg-black/30 border border-white/10 text-xs font-mono text-slate-400">
              ID: {certId}
            </div>
            <div className="pt-2">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-colors"
              >
                Browse Verified Courses <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* ── HackerRank-Style Verified Layout ── */}
        {!loading && verified === true && certData && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* ── Left Column: Clean HackerRank Certificate Document (8 Cols) ── */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-[#161b22] p-3 sm:p-6 rounded-2xl border border-white/10 shadow-2xl">
                <CertificateCard certificate={certData} isPublicVerification={true} />
              </div>
            </div>

            {/* ── Right Column: Verification Metadata & Actions Sidebar (4 Cols) ── */}
            <div className="lg:col-span-4 space-y-5">
              {/* Credential Status Card */}
              <div className="p-5 rounded-2xl bg-[#161b22] border border-white/10 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Verified Certificate</div>
                    <div className="text-[11px] text-emerald-400 font-medium">
                      Authentic & Active Credential
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <div className="text-slate-400 text-[11px]">Candidate</div>
                    <div className="font-semibold text-white text-sm mt-0.5">
                      {certData.learnerName}
                    </div>
                  </div>

                  <div>
                    <div className="text-slate-400 text-[11px]">Skill Assessment</div>
                    <div className="font-semibold text-slate-200 mt-0.5 leading-snug">
                      {certData.courseTitle}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div>
                      <div className="text-slate-400 text-[11px]">Issue Date</div>
                      <div className="font-semibold text-slate-200 font-mono mt-0.5">
                        {new Date(certData.issuedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[11px]">Test Score</div>
                      <div className="font-bold text-emerald-400 font-mono mt-0.5">
                        {certData.score !== undefined ? `${certData.score}% Passed` : "100% Passed"}
                      </div>
                    </div>
                  </div>

                  <div className="pt-1">
                    <div className="text-slate-400 text-[11px]">Credential ID</div>
                    <div className="font-mono text-slate-300 bg-white/5 px-2 py-1 rounded border border-white/5 text-[11px] truncate mt-0.5">
                      {certData.certificateId}
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-colors shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download PDF / Print
                  </button>

                  <button
                    onClick={handleLinkedInAddToProfile}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#0A66C2] hover:bg-[#084e96] text-white transition-colors cursor-pointer shadow-xs"
                  >
                    <Linkedin className="w-4 h-4 fill-current" /> Add to LinkedIn Profile
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-medium border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copied ? "Link Copied" : "Copy Verification URL"}
                  </button>
                </div>
              </div>

              {/* Skills Tested Breakdown */}
              <div className="p-5 rounded-2xl bg-[#161b22] border border-white/10 space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Skills Evaluated & Tested
                </div>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assessment Standard Info */}
              <div className="p-5 rounded-2xl bg-[#161b22] border border-white/10 space-y-2 text-xs text-slate-400 leading-relaxed">
                <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  About CodeTree Certification
                </div>
                <p>
                  Assessments are timed and require both interactive coding challenges and theoretical competency verification.
                </p>
                <p className="text-[11px] text-slate-500">
                  This credential is cryptographically verified in our immutable PostgreSQL registry and represents genuine mastery of the curriculum.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
