import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Plus, Check } from "lucide-react";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./verified-badge";
import { formatFollowers } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { useListStore } from "@/features/list/store";

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
      <mark key={i} className="bg-indigo-500/20 text-inherit rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

const platformColors: Record<Platform, string> = {
  instagram: "from-pink-500 to-purple-500",
  youtube: "from-red-500 to-red-600",
  tiktok: "from-cyan-400 to-pink-500",
};

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
      className="group relative flex flex-col rounded-2xl glass cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--border-medium)] hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
    >
      {/* Gradient top accent bar */}
      <div
        className={cn(
          "h-1 w-full bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity duration-300",
          platformColors[platform],
        )}
      />

      <div className="p-5">
        {/* Header: Avatar + Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative shrink-0">
            <img
              src={profile.picture}
              alt={`${profile.fullname}'s avatar`}
              className="h-14 w-14 rounded-xl object-cover ring-2 ring-[var(--border-subtle)] group-hover:ring-[var(--accent-indigo)]/40 transition-all duration-300"
              loading="lazy"
            />
            {profile.is_verified && (
              <div className="absolute -bottom-1 -right-1 bg-[var(--bg-primary)] rounded-full p-0.5">
                <VerifiedBadge verified={true} />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-[var(--text-primary)] truncate text-sm">
                {highlightUsername}
              </span>
            </div>
            <div className="text-xs text-[var(--text-secondary)] truncate mt-0.5">
              {highlightName}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
            <Users className="h-3.5 w-3.5 text-[var(--accent-indigo)]" />
            <span className="font-medium text-[var(--text-primary)]">
              {formatFollowers(profile.followers)}
            </span>
            <span>followers</span>
          </div>
          {profile.engagement_rate !== undefined && (
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <Heart className="h-3.5 w-3.5 text-pink-400" />
              <span
                className={cn(
                  "font-medium",
                  profile.engagement_rate * 100 > 3
                    ? "text-emerald-400"
                    : profile.engagement_rate * 100 > 1
                      ? "text-amber-400"
                      : "text-[var(--text-primary)]",
                )}
              >
                {(profile.engagement_rate * 100).toFixed(1)}%
              </span>
              <span>engagement</span>
            </div>
          )}
        </div>

        {/* Add to List Button */}
        <button
          onClick={handleAddToList}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200",
            inList
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25"
              : "bg-[var(--accent-indigo)]/10 text-[var(--accent-indigo)] border border-[var(--accent-indigo)]/20 hover:bg-[var(--accent-indigo)]/20",
          )}
          aria-label={
            inList
              ? `Remove ${profile.fullname} from list`
              : `Add ${profile.fullname} to list`
          }
        >
          {inList ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Added to List
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              Add to List
            </>
          )}
        </button>
      </div>
    </div>
  );
});
