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
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="text-6xl mb-4 opacity-30">🔍</div>
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
          No profiles found
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
          Try a different search term or platform
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {profiles.map((profile, i) => (
          <motion.div
            key={profile.user_id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
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
