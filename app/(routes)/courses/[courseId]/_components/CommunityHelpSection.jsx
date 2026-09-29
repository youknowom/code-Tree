import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircle, Users } from "lucide-react";

export default function CommunityHelpSection() {
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden shadow-xs p-5 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
          <Users className="w-4 h-4" />
        </div>
        <div>
          <h3 className="font-bold text-[var(--fg)] text-sm">Need Help?</h3>
          <p className="text-xs text-[var(--fg-subtle)]">Ask fellow engineers</p>
        </div>
      </div>

      <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
        Got stuck on an exercise? Join our Discord community to discuss solutions and syntax tips with peers.
      </p>

      <Button
        asChild
        className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-xs h-9 rounded-xl shadow-xs"
      >
        <Link
          href="https://discord.gg/z7XVq8K48G"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="w-3.5 h-3.5 mr-2" />
          Join Discord Community
        </Link>
      </Button>
    </div>
  );
}
