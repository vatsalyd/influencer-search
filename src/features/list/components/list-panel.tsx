import { Trash2, Users, ExternalLink, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useListStore } from "../store";
import { VerifiedBadge } from "@/features/search/components/verified-badge";
import { formatFollowers, timeAgo } from "@/lib/formatters";

export function ListPanel() {
  const { profiles, removeProfile, clearList } = useListStore();

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
          <Users className="h-7 w-7 text-[var(--text-muted)]" />
        </div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)] font-[var(--font-display)]">
          Your list is empty
        </h3>
        <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xs">
          Search for influencers and add them to your list to compare and manage
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between text-sm px-1 mb-2">
        <span className="text-[var(--text-muted)]">
          {profiles.length} profile{profiles.length !== 1 ? "s" : ""} selected
        </span>
        <button
          onClick={clearList}
          className="text-red-400 hover:text-red-300 text-xs font-medium transition-colors hover:underline"
        >
          Clear all
        </button>
      </div>

      <AnimatePresence mode="popLayout">
        {profiles.map((profile, i) => (
          <motion.div
            key={profile.user_id}
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.15 } }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: i * 0.03,
            }}
            className="flex items-center gap-3 p-3 rounded-xl glass hover:border-[var(--border-medium)] transition-all duration-200 group"
          >
            <img
              src={profile.picture}
              alt={profile.fullname}
              className="h-10 w-10 rounded-lg object-cover shrink-0 ring-1 ring-[var(--border-subtle)]"
              loading="lazy"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                  @{profile.username}
                </span>
                <VerifiedBadge verified={profile.is_verified} />
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <span className="truncate">{profile.fullname}</span>
                <span>·</span>
                <span>{formatFollowers(profile.followers)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[var(--text-muted)] mt-0.5">
                <Clock className="h-3 w-3" />
                <span>{timeAgo(profile.added_at)}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
              <Link
                to={`/profile/${profile.username}?platform=${profile.platform}`}
                className="p-2 rounded-lg hover:bg-white/5 transition-colors text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                aria-label={`View ${profile.fullname} profile`}
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
              <button
                onClick={() => removeProfile(profile.user_id)}
                className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-[var(--text-muted)] hover:text-red-400"
                aria-label={`Remove ${profile.fullname} from list`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
