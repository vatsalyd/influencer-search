import { Trash2, Users, ExternalLink, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useListStore } from "../store";
import { VerifiedBadge } from "@/features/search/components/verified-badge";
import { formatFollowers, timeAgo } from "@/lib/formatters";

export function ListPanel() {
  const { profiles, removeProfile, clearList } = useListStore();

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
          <Users className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Your list is empty
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Search for influencers and add them to your list
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-1">
        <span>{profiles.length} profile{profiles.length !== 1 ? "s" : ""} selected</span>
        <button
          onClick={clearList}
          className="text-red-500 hover:text-red-600 text-xs font-medium transition-colors"
        >
          Clear all
        </button>
      </div>

      {profiles.map((profile) => (
        <div
          key={profile.user_id}
          className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/30"
        >
          <img
            src={profile.picture}
            alt={profile.fullname}
            className="h-10 w-10 rounded-full object-cover shrink-0"
            loading="lazy"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                @{profile.username}
              </span>
              <VerifiedBadge verified={profile.is_verified} />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{profile.fullname}</span>
              <span>·</span>
              <span>{formatFollowers(profile.followers)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              <Clock className="h-3 w-3" />
              <span>{timeAgo(profile.added_at)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <Link
              to={`/profile/${profile.username}?platform=${profile.platform}`}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-400"
              aria-label={`View ${profile.fullname} profile`}
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
            <button
              onClick={() => removeProfile(profile.user_id)}
              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-gray-400 hover:text-red-500"
              aria-label={`Remove ${profile.fullname} from list`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
