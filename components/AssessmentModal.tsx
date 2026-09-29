"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  X,
  HelpCircle,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import confetti from "canvas-confetti";

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface QuestionReview {
  id: number;
  question: string;
  options: string[];
  submittedAnswer: number | null;
  correctAnswer: number;
  isCorrect: boolean;
  explanation: string;
}

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  courseTitle: string;
  assessmentTitle: string;
  passingScore: number;
  questions: Question[];
  onSuccess: (certificate: any) => void;
}

export default function AssessmentModal({
  isOpen,
  onClose,
  courseId,
  courseTitle,
  assessmentTitle,
  passingScore,
  questions,
  onSuccess,
}: AssessmentModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    passed: boolean;
    score: number;
    passingScore: number;
    message: string;
    questionReview?: QuestionReview[];
    certificate?: any;
  } | null>(null);

  if (!isOpen) return null;

  const totalQuestions = questions.length;
  const currentQ = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIdx === totalQuestions - 1;

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleSubmit = async () => {
    if (answeredCount < totalQuestions) {
      const confirmIncomplete = window.confirm(
        `You have answered ${answeredCount} of ${totalQuestions} questions. Unanswered questions will be marked incorrect. Submit anyway?`
      );
      if (!confirmIncomplete) return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post("/api/assessment", {
        courseId,
        answers,
      });

      setResult(res.data);

      if (res.data.passed) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        toast.success("Exam passed! Certificate unlocked!");
        if (res.data.certificate) {
          onSuccess(res.data.certificate);
        }
      } else {
        toast.error(`Exam completed. You scored ${res.data.score}%. Retake available.`);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to submit assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIdx(0);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--bg-elevated)]/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[var(--fg)]">{assessmentTitle}</h2>
              <p className="text-xs text-[var(--fg-muted)]">
                Passing Score: {passingScore}% required for Certificate
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--overlay-8)] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (During Exam) */}
        {!result && (
          <div className="w-full bg-[var(--border)] h-1">
            <div
              className="bg-amber-500 h-1 transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* ── EXAM IN PROGRESS ── */}
          {!result && currentQ && (
            <div className="space-y-6">
              {/* Question Index Pill */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                  Question {currentIdx + 1} of {totalQuestions}
                </span>

                <span className="text-xs text-[var(--fg-muted)]">
                  {answeredCount} of {totalQuestions} Answered
                </span>
              </div>

              {/* Question Text */}
              <div className="text-base sm:text-lg font-bold text-[var(--fg)] leading-relaxed">
                {currentQ.question}
              </div>

              {/* Options List */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = answers[currentQ.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/15 border-amber-500/50 text-white shadow-sm"
                          : "bg-[var(--bg-elevated)] border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-slate-600"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? "border-amber-400 bg-amber-500 text-slate-950"
                            : "border-[var(--border)] bg-transparent"
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                      </div>
                      <span className="text-sm font-medium leading-normal">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Question Quick-Jump Navigator */}
              <div className="pt-4 border-t border-[var(--border)]">
                <div className="text-[11px] text-[var(--fg-muted)] font-medium mb-2">
                  Jump to question:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {questions.map((q, idx) => {
                    const isAnswered = answers[q.id] !== undefined;
                    const isCurrent = idx === currentIdx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentIdx(idx)}
                        className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-amber-500 text-slate-950 ring-2 ring-amber-400/40"
                            : isAnswered
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-[var(--bg-elevated)] text-[var(--fg-muted)] border border-[var(--border)]"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── EXAM RESULT SCREEN ── */}
          {result && (
            <div className="space-y-6">
              {result.passed ? (
                /* PASSED CELEBRATION */
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent border border-emerald-500/30 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-400">
                      EXAM PASSED WITH DISTINCTION
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      Congratulations, Certified!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                      You scored{" "}
                      <span className="font-bold text-emerald-400 font-mono text-base">
                        {result.score}%
                      </span>{" "}
                      (Required: {result.passingScore}%). Your certificate has been issued and
                      verified.
                    </p>
                  </div>

                  {result.certificate && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 max-w-sm mx-auto">
                      Credential ID:{" "}
                      <span className="text-emerald-400 font-bold">
                        {result.certificate.certificateId}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    {result.certificate && (
                      <Link
                        href={`/verify/${result.certificate.certificateId}`}
                        target="_blank"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4" /> View Verified Certificate
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onClose}
                      className="text-xs font-medium border-[var(--border)]"
                    >
                      Return to Course
                    </Button>
                  </div>
                </div>
              ) : (
                /* FAILED / RETAKE NOTICE */
                <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
                    <XCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-widest font-mono font-bold text-rose-400">
                      ASSESSMENT INCOMPLETE
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      Passing Score Not Reached
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                      You scored{" "}
                      <span className="font-bold text-rose-400 font-mono text-base">
                        {result.score}%
                      </span>
                      . A minimum score of {result.passingScore}% is required to unlock your
                      verified certificate.
                    </p>
                  </div>

                  <div className="pt-2 flex justify-center gap-3">
                    <Button
                      onClick={handleRetake}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-5 rounded-xl flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Retake Assessment
                    </Button>
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="text-xs font-medium border-[var(--border)]"
                    >
                      Review Course Modules
                    </Button>
                  </div>
                </div>
              )}

              {/* Question Review Breakdown */}
              {result.questionReview && (
                <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                  <h4 className="text-sm font-bold text-[var(--fg)] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                    Detailed Answer Explanations
                  </h4>

                  <div className="space-y-3">
                    {result.questionReview.map((q, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border text-xs space-y-2 ${
                          q.isCorrect
                            ? "bg-emerald-500/5 border-emerald-500/20"
                            : "bg-rose-500/5 border-rose-500/20"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-white">
                            {idx + 1}. {q.question}
                          </span>
                          <span
                            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              q.isCorrect
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-rose-500/20 text-rose-400"
                            }`}
                          >
                            {q.isCorrect ? "Correct" : "Incorrect"}
                          </span>
                        </div>

                        <div className="text-slate-400">
                          <span className="font-medium text-slate-300">Correct Answer: </span>
                          {q.options[q.correctAnswer]}
                        </div>

                        <div className="p-2.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-slate-300 leading-relaxed">
                          <span className="font-semibold text-amber-400">Concept: </span>
                          {q.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Navigation (During Exam) */}
        {!result && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border)] bg-[var(--bg-elevated)]/40">
            <Button
              variant="outline"
              size="sm"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => i - 1)}
              className="text-xs font-medium border-[var(--border)] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Previous
            </Button>

            <div className="flex items-center gap-2">
              {!isLastQuestion ? (
                <Button
                  size="sm"
                  onClick={() => setCurrentIdx((i) => i + 1)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 rounded-lg cursor-pointer"
                >
                  Next <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  disabled={submitting}
                  onClick={handleSubmit}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-5 rounded-lg cursor-pointer shadow-sm"
                >
                  {submitting ? "Grading Exam..." : "Submit for Certification"}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
