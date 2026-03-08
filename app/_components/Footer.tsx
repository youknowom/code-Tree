import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, MessageCircle, ArrowUpRight } from "lucide-react";

const footerLinks = {
    Learn: [
        { label: "All Courses", href: "/courses" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Pricing", href: "/pricing" },
    ],
    Company: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
    ],
    Legal: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
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
    {
        href: "https://discord.gg/z7XVq8K48G",
        icon: <MessageCircle className="w-4 h-4" />,
        label: "Discord",
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
                        Join 50,000+ learners building real skills with hands-on exercises and instant feedback.
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
                            <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-white/10 group-hover:ring-amber-400/40 transition-all">
                                <Image
                                    src="/logo.png"
                                    alt="CodeTree logo"
                                    fill
                                    className="object-contain p-0.5"
                                />
                            </div>
                            <span className="font-bold text-xl gradient-text-brand">CodeTree</span>
                        </Link>
                        <p className="text-sm text-[var(--fg-subtle)] leading-relaxed max-w-xs">
                            The interactive coding platform where you learn by doing. Build real skills through hands-on exercises with instant feedback.
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
                        CodeTree • v0.1.0
                    </p>
                </div>
            </div>
        </footer>
    );
}
