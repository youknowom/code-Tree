"use client";

import React, { useState } from "react";
import { Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        // Simulate form submission
        setTimeout(() => {
            setLoading(false);
            toast.success("Message sent successfully! We'll stay in touch.");
            (e.target as HTMLFormElement).reset();
        }, 1500);
    };

    const copyEmail = () => {
        navigator.clipboard.writeText("support@codetree.dev");
        toast.success("Email address copied to clipboard");
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[var(--bg-page)] py-12 px-4 sm:px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-50">
                <div
                    className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-[120px]"
                    style={{ transform: "translate(30%, -30%)" }}
                />
                <div
                    className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-400/10 rounded-full blur-[120px]"
                    style={{ transform: "translate(-30%, 30%)" }}
                />
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header content */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-500 font-medium text-sm mb-6">
                        <Mail className="w-4 h-4" />
                        <span>Get in touch</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[var(--fg)] tracking-tight mb-4">
                        We&apos;re here to help
                    </h1>
                    <p className="text-[var(--fg-muted)] text-lg">
                        Have a question, feedback, or need support? Reach out to our team
                        and we&apos;ll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Contact Information */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] shadow-sm">
                            <h3 className="text-lg font-bold text-[var(--fg)] mb-6">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--fg-muted)]">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[var(--fg)]">Email us</p>
                                        <p className="text-xs text-[var(--fg-subtle)] mb-2">Our friendly team is here to help.</p>
                                        <button
                                            onClick={copyEmail}
                                            className="text-sm font-semibold text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1.5"
                                        >
                                            support@codetree.dev
                                            <Copy className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--fg-muted)]">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[var(--fg)]">Office</p>
                                        <p className="text-xs text-[var(--fg-subtle)] mb-1">Come say hello at our HQ.</p>
                                        <p className="text-sm font-semibold text-[var(--fg-muted)]">
                                            100 Code Ave<br />
                                            San Francisco, CA 94107
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--fg-muted)]">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[var(--fg)]">Phone</p>
                                        <p className="text-xs text-[var(--fg-subtle)] mb-1">Mon-Fri from 8am to 5pm.</p>
                                        <p className="text-sm font-semibold text-[var(--fg-muted)]">+1 (555) 000-0000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="p-6 md:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] shadow-sm">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-semibold text-[var(--fg)]">First name</label>
                                        <input
                                            id="firstName"
                                            required
                                            className="w-full h-11 px-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all placeholder:text-[var(--fg-subtle)]"
                                            placeholder="Jane"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-semibold text-[var(--fg)]">Last name</label>
                                        <input
                                            id="lastName"
                                            className="w-full h-11 px-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all placeholder:text-[var(--fg-subtle)]"
                                            placeholder="Smith"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-[var(--fg)]">Email address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        className="w-full h-11 px-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all placeholder:text-[var(--fg-subtle)]"
                                        placeholder="jane@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-semibold text-[var(--fg)]">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        className="w-full p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--fg)] focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all placeholder:text-[var(--fg-subtle)] resize-none"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 gradient-brand text-[oklch(0.1_0.005_264)] font-semibold border-0 shadow-lg shadow-amber-400/20 hover:opacity-90 transition-opacity"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                            Sending...
                                        </div>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Send message
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
