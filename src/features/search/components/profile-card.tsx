import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Plus, Check } from "lucide-react";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./verified-badge";
import { formatFollowers } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useListStore } from "@/features/list/store";
import { Button } from "@/components/ui/button";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  query?: string;
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-indigo-100 dark:bg-indigo-900/40 text-inherit rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
  query = "",
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addProfile, isInList, removeProfile } = useListStore();
  const inList = isInList(profile.user_id);

  const handleClick = useCallback(() => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  }, [profile.username, platform, navigate]);

  const handleAddToList = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (inList) {
        removeProfile(profile.user_id);
      } else {
        addProfile({
          user_id: profile.user_id,
          username: profile.username,
          fullname: profile.fullname,
          picture: profile.picture,
          platform,
          followers: profile.followers,
          is_verified: profile.is_verified,
        });
      }
    },
    [profile, platform, inList, addProfile, removeProfile],
  );

  const highlightName = highlightMatch(profile.fullname, query);
  const highlightUsername = highlightMatch(profile.username, query);

  return (
    <div
      onClick={handleClick}
      className="group flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-900/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 hover:-translate-y-1 hover:scale-[1.01] active:scale-[0.99]"
    >
      <img
        src={profile.picture}
        alt={`${profile.fullname}'s avatar`}
        className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700 shrink-0"
        loading="lazy"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {highlightUsername}
          </span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {highlightName}
        </div>
        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Users className="h-3 w-3" />
            <span>{formatFollowers(profile.followers)}</span>
          </div>
          {profile.engagement_rate !== undefined && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Heart className="h-3 w-3" />
              <span>{(profile.engagement_rate * 100).toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>

      <Button
        variant={inList ? "secondary" : "outline"}
        size="sm"
        onClick={handleAddToList}
        className={cn(
          "shrink-0 transition-all duration-200",
          inList && "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
        )}
        aria-label={inList ? `Remove ${profile.fullname} from list` : `Add ${profile.fullname} to list`}
      >
        {inList ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Added
          </>
        ) : (
          <>
            <Plus className="h-3.5 w-3.5" />
            Add
          </>
        )}
      </Button>
    </div>
  );
});
