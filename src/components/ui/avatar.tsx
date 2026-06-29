import { type ImgHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, alt, fallback, ...props }, ref) => {
    return (
      <div className="relative inline-flex shrink-0 overflow-hidden rounded-full">
        <img
          ref={ref}
          className={cn("aspect-square h-full w-full object-cover", className)}
          alt={alt}
          loading="lazy"
          {...props}
        />
      </div>
    );
  },
);
Avatar.displayName = "Avatar";

export { Avatar };
