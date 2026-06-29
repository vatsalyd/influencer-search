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

const platformColors: Record<Platform, string> = {
  instagram:
    "data-[active=true]:bg-gradient-to-r data-[active=true]:from-pink-500 data-[active=true]:via-purple-500 data-[active=true]:to-orange-400 data-[active=true]:text-white data-[active=true]:border-transparent",
  youtube:
    "data-[active=true]:bg-red-600 data-[active=true]:text-white data-[active=true]:border-transparent",
  tiktok:
    "data-[active=true]:bg-gray-900 dark:data-[active=true]:bg-white data-[active=true]:text-white dark:data-[active=true]:text-gray-900 data-[active=true]:border-transparent",
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
            data-active={isActive}
            className={cn(
              "relative flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-200",
              "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700",
              "data-[active=true]:shadow-sm",
              platformColors[p],
              !isActive && "bg-white dark:bg-gray-900",
              "active:scale-95",
            )}
            aria-pressed={isActive}
          >
            <PlatformIcon platform={p} className="h-4 w-4" />
            {getPlatformLabel(p)}
            {isActive && (
              <span className="absolute inset-0 rounded-lg ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-950 ring-current opacity-60 animate-[fade-in-up_0.2s_ease-out]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
