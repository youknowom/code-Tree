"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-page)] backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                {/* Animated Tree Logo */}
                <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 animate-pulse rounded-2xl blur-xl" />

                    {/* Inner container */}
                    <div className="relative z-10 w-12 h-12 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] flex items-center justify-center shadow-lg">
                        {/* Code brackets and tree combined animation */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative flex items-center justify-center"
                        >
                            <div className="font-bold text-xl tracking-tight gradient-text-brand flex gap-1">
                                <span>&lt;</span>
                                <span className="text-[var(--fg)]">/</span>
                                <span>&gt;</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Rotating ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-amber-400/50 border-r-amber-500/50"
                    />
                </div>

                {/* Loading Text */}
                <div className="flex flex-col items-center gap-2">
                    <motion.h2
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg font-bold text-[var(--fg)] tracking-wide"
                    >
                        CodeTree
                    </motion.h2>

                    <div className="flex items-center gap-1">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xs font-medium text-[var(--fg-muted)] uppercase tracking-widest"
                        >
                            Loading Environment
                        </motion.span>
                        <span className="flex gap-0.5 ml-1">
                            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-1 h-1 rounded-full bg-amber-400" />
                            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 rounded-full bg-amber-400" />
                            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 rounded-full bg-amber-400" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
