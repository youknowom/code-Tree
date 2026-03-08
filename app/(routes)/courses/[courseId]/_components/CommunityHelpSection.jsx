import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageCircle, Users } from "lucide-react";

function CommunityHelpSection() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-violet-400/15 bg-[oklch(0.12_0.01_264)]">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.65 0.22 265 / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-violet-400/8 border border-violet-400/15 flex items-center justify-center">
            <Users className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Need Help?</h3>
            <p className="text-xs text-white/40">Ask the community</p>
          </div>
        </div>

        <p className="text-sm text-white/50 leading-relaxed mb-4">
          Join our Discord community to get help from fellow learners and mentors.
        </p>

        <Link href="https://discord.gg/z7XVq8K48G" target="_blank" rel="noopener noreferrer">
          <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold border-0 transition-colors h-10">
            <MessageCircle className="w-4 h-4 mr-2" />
            Join Discord Community
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default CommunityHelpSection;
