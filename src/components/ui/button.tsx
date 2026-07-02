import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient";
type ButtonSize = "default" | "sm" | "lg" | "icon";

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-[var(--accent-indigo)] text-white hover:bg-indigo-700 shadow-sm hover:shadow-[var(--shadow-glow-sm)]",
  destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  outline:
    "border border-[var(--border-subtle)] bg-transparent hover:bg-white/5 text-[var(--text-primary)] hover:border-[var(--border-medium)]",
  secondary:
    "bg-white/5 text-[var(--text-primary)] hover:bg-white/10 border border-[var(--border-subtle)]",
  ghost:
    "hover:bg-white/5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
  link: "text-[var(--accent-indigo)] underline-offset-4 hover:underline",
  gradient:
    "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-lg px-3",
  lg: "h-11 rounded-xl px-8",
  icon: "h-10 w-10",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
