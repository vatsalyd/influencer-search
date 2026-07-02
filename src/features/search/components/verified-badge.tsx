import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span className="inline-flex animate-[pulse-glow_2s_ease-in-out_infinite] rounded-full">
      <BadgeCheck
        className="inline-block h-4 w-4 text-[var(--accent-indigo)] -mt-0.5"
        aria-label="Verified"
      />
    </span>
  );
}
