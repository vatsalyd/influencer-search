import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "success" | "instagram" | "youtube" | "tiktok";

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-indigo-500/15 text-[var(--accent-indigo)]",
  secondary:
    "bg-white/5 text-[var(--text-secondary)] border border-[var(--border-subtle)]",
  destructive:
    "bg-red-500/15 text-red-400",
  outline:
    "border border-[var(--border-subtle)] text-[var(--text-secondary)]",
  success:
    "bg-emerald-500/15 text-emerald-400",
  instagram:
    "bg-gradient-to-r from-pink-500/15 to-purple-500/15 text-pink-400",
  youtube:
    "bg-red-500/15 text-red-400",
  tiktok:
    "bg-cyan-500/15 text-cyan-400",
};

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge };
