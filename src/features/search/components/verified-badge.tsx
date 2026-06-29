import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <BadgeCheck
      className="inline-block h-4 w-4 text-blue-500 -mt-0.5"
      aria-label="Verified"
    />
  );
}
