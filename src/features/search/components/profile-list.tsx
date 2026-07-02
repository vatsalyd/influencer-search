import { motion, AnimatePresence } from "framer-motion";
import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./profile-card";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  query: string;
}

export function ProfileList({
  profiles,
  platform,
  query,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-5">
          <span className="text-4xl opacity-50">🔍</span>
        </div>
        <p className="text-[var(--text-primary)] text-lg font-semibold font-[var(--font-display)] mb-1">
          No profiles found
        </p>
        <p className="text-[var(--text-muted)] text-sm">
          Try a different search term or platform
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence mode="popLayout">
        {profiles.map((profile, i) => (
          <motion.div
            key={profile.user_id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
              delay: i * 0.04,
            }}
          >
            <ProfileCard
              profile={profile}
              platform={platform}
              query={query}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
