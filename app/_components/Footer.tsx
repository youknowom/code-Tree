import Link from "next/link";
import CodeTreeLogo from "@/components/CodeTreeLogo";
import { Github, Twitter, MessageCircle, ArrowUpRight } from "lucide-react";

const footerLinks = {
    Curriculum: [
        { label: "TypeScript Essentials", href: "/courses/5" },
        { label: "React 19 Beginner", href: "/courses/1" },
        { label: "Next.js Fullstack", href: "/courses/8" },
        { label: "Tailwind CSS", href: "/courses/6" },
        { label: "Python Programming", href: "/courses/7" },
        { label: "JavaScript Core", href: "/courses/4" },
    ],
    Platform: [
        { label: "All Courses", href: "/courses" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Free Access", href: "/pricing" },
        { label: "Contact & Feedback", href: "/contact" },
    ],
};

const socialLinks = [
    {
        href: "https://github.com",
        icon: <Github className="w-4 h-4" />,
        label: "GitHub",
    },
    {
        href: "https://twitter.com",
        icon: <Twitter className="w-4 h-4" />,
        label: "Twitter",
    },
];

export default function Footer() {
    return (
        <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-page)]">
            {/* CTA Banner */}
            <div className="relative overflow-hidden border-b border-[var(--border-subtle)]">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 60% 80% at 50% 0%, oklch(0.76 0.18 85 / 0.06) 0%, transparent 70%)",
                    }}
                />
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-16 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--fg)] mb-4 leading-tight">
                        Ready to start coding?
                    </h2>
                    <p className="text-[var(--fg-subtle)] mb-8 max-w-md mx-auto">
                        Build practical web development skills with interactive in-browser exercises and instant verification.
                    </p>
                    <Link
                        href="/sign-up"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl gradient-brand text-[oklch(0.1_0.005_264)] font-semibold text-sm hover:opacity-90 transition-opacity shadow-xl shadow-amber-400/20"
                    >
                        Start Learning Free
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Footer links */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
                            <CodeTreeLogo size="lg" />
                        </Link>
                        <p className="text-sm text-[var(--fg-subtle)] leading-relaxed max-w-xs">
                            The interactive coding platform where you learn by doing. Hands-on exercises, browser execution, and instant feedback.
                        </p>
                        {/* Social links */}
                        <div className="flex items-center gap-3 mt-5">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-9 h-9 rounded-lg bg-white/5 border border-[var(--border-default)] flex items-center justify-center text-[var(--fg-subtle)] hover:text-white hover:bg-[var(--overlay-12)] hover:border-[var(--border-strong)] transition-all"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <h3 className="text-xs font-bold text-[var(--fg-subtle)] uppercase tracking-widest mb-4">
                                {group}
                            </h3>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]/90 transition-colors duration-150"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-subtle)]">
                    <p className="text-xs text-[var(--fg-subtle)]">
                        © {new Date().getFullYear()} CodeTree. All rights reserved.
                    </p>
                    <p className="text-xs text-[var(--fg-subtle)]">
                        Practice-Driven Web Development
                    </p>
                </div>
            </div>
        </footer>
    );
}
