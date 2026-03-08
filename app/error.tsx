"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-md w-full"
            >
                <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-card)] shadow-2xl overflow-hidden text-center p-8 sm:p-10 z-10">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-amber-500" />

                    <div className="w-16 h-16 mx-auto bg-rose-500/10 rounded-2xl flex items-center justify-center border border-rose-500/20 mb-6 drop-shadow-sm">
                        <AlertTriangle className="w-8 h-8 text-rose-500" />
                    </div>

                    <h1 className="text-2xl font-bold text-[var(--fg)] mb-3">Something went wrong</h1>

                    <p className="text-sm text-[var(--fg-muted)] mb-8 leading-relaxed">
                        We encountered an unexpected error while loading this page. Our team has been notified.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                        <Button
                            onClick={() => reset()}
                            className="w-full sm:w-auto text-[oklch(0.1_0.005_264)] gradient-brand font-semibold shadow-lg shadow-amber-400/20 border-0 hover:opacity-90 transition-opacity"
                        >
                            <RefreshCcw className="w-4 h-4 mr-2" />
                            Try again
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="w-full sm:w-auto bg-[var(--bg-card)] text-[var(--fg)] hover:bg-[var(--bg-elevated)] border-[var(--border-default)]"
                        >
                            <Link href="/">
                                <Home className="w-4 h-4 mr-2" />
                                Go home
                            </Link>
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
