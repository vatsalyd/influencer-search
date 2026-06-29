import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ProfileStatProps {
  label: string;
  value: string;
}

export function ProfileStat({ label, value }: ProfileStatProps) {
  return (
    <div className="flex flex-col p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
      <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-0.5">
        {value}
      </span>
    </div>
  );
}

interface StatsGridProps {
  children: ReactNode;
  className?: string;
}

export function StatsGrid({ children, className }: StatsGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
}
