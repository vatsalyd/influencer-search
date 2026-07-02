import { motion } from "framer-motion";
import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/lib/data-helpers";
import { cn } from "@/lib/utils";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

interface PlatformIconProps {
  platform: Platform;
  className?: string;
}

function PlatformIcon({ platform, className }: PlatformIconProps) {
  switch (platform) {
    case "instagram":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
  }
}

const platformAccents: Record<Platform, string> = {
  instagram: "from-pink-500 via-purple-500 to-orange-400",
  youtube: "from-red-500 to-red-600",
  tiktok: "from-cyan-400 to-pink-500",
};

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div className="flex gap-2" role="group" aria-label="Platform filter">
      {PLATFORMS.map((p) => {
        const isActive = selected === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              "active:scale-95",
              isActive
                ? "text-white shadow-lg"
                : "glass text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)]",
            )}
            aria-pressed={isActive}
          >
            {/* Active gradient background */}
            {isActive && (
              <motion.div
                layoutId="platform-tab"
                className={cn(
                  "absolute inset-0 rounded-xl bg-gradient-to-r",
                  platformAccents[p],
                )}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <PlatformIcon platform={p} className="h-4 w-4" />
              {getPlatformLabel(p)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
