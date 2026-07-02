import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ListDrawerProps {
  children: ReactNode;
  onClose: () => void;
}

export function ListDrawer({ children, onClose }: ListDrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed right-0 top-0 bottom-0 w-full max-w-md glass border-l border-[var(--border-subtle)] shadow-2xl"
          style={{ background: "var(--bg-secondary)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Selected profiles list"
        >
          {/* Header with gradient accent */}
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />
            <div className="flex items-center justify-between p-4 border-b border-[var(--border-subtle)]">
              <h2 className="text-lg font-semibold text-[var(--text-primary)] font-[var(--font-display)]">
                My List
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label="Close list"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="h-[calc(100vh-65px)] overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
