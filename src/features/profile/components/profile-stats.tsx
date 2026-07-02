import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/animated-counter";
import {
  Users,
  Heart,
  MessageCircle,
  Eye,
  BarChart3,
  ThumbsUp,
  Globe,
  User,
  Calendar,
  FileText,
} from "lucide-react";

interface ProfileStatProps {
  label: string;
  value: string;
  numericValue?: number;
}

const statIcons: Record<string, typeof Users> = {
  Followers: Users,
  "Engagement Rate": Heart,
  Posts: FileText,
  "Avg Likes": ThumbsUp,
  "Avg Comments": MessageCircle,
  "Avg Views": Eye,
  Engagements: BarChart3,
  "Total Likes": ThumbsUp,
  Gender: User,
  "Age Group": Calendar,
  Country: Globe,
};

export function ProfileStat({ label, value, numericValue }: ProfileStatProps) {
  const Icon = statIcons[label] || BarChart3;

  return (
    <div className="flex flex-col p-4 rounded-xl glass hover:border-[var(--border-medium)] transition-all duration-300 group">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500/15 to-violet-500/15 group-hover:from-indigo-500/25 group-hover:to-violet-500/25 transition-colors duration-300">
          <Icon className="h-3.5 w-3.5 text-[var(--accent-indigo)]" />
        </div>
        <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span className="text-lg font-bold text-[var(--text-primary)] font-[var(--font-display)]">
        {numericValue !== undefined ? (
          <AnimatedCounter value={numericValue} formatter={() => value} />
        ) : (
          value
        )}
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
