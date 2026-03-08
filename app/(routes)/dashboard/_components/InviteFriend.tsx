import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Users2 } from "lucide-react";

function InviteFriend() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)]">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 0% 100%, oklch(0.65 0.22 265 / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-violet-400/8 border border-violet-400/15 flex items-center justify-center">
            <Users2 className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[var(--fg)] mb-1">Invite a Friend</h3>
            <p className="text-sm text-[var(--fg-subtle)] leading-relaxed">
              Share the love! Invite a friend and learn together.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="friend@email.com"
            className="flex-1 bg-white/4 border-[var(--border-strong)] text-[var(--fg)]/90 placeholder:text-[var(--fg-subtle)] focus-visible:border-amber-400/50 focus-visible:ring-amber-400/20 h-10"
          />
          <Button className="gradient-brand text-[oklch(0.1_0.005_264)] font-semibold border-0 hover:opacity-90 transition-opacity h-10 px-5">
            Invite
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InviteFriend;
