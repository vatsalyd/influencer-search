import { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Plus, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/app-layout";
import { VerifiedBadge } from "@/features/search/components/verified-badge";
import { ProfileStat, StatsGrid } from "./components/profile-stats";
import type { FullUserProfile } from "@/types";
import { formatNumber, formatEngagementRate } from "@/lib/formatters";
import { loadProfileByUsername } from "@/lib/profile-loader";
import { getPlatformLabel } from "@/lib/data-helpers";
import { useListStore } from "@/features/list/store";
import { cn } from "@/lib/utils";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<FullUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addProfile, isInList, removeProfile } = useListStore();

  useEffect(() => {
    if (!username) {
      setIsLoading(false);
      setError("No username provided");
      return;
    }

    setIsLoading(true);
    setError(null);

    loadProfileByUsername(username)
      .then((data) => {
        if (!data || !data.data?.user_profile) {
          setError(`Could not load profile details for ${username}`);
          setProfileData(null);
        } else {
          setProfileData(data.data.user_profile);
        }
      })
      .catch(() => {
        setError(`Could not load profile details for ${username}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [username]);

  const user = profileData;

  const inList = useMemo(
    () => (user ? isInList(user.user_id) : false),
    [user, isInList],
  );

  const handleAddToList = useCallback(() => {
    if (!user) return;
    if (inList) {
      removeProfile(user.user_id);
    } else {
      addProfile({
        user_id: user.user_id,
        username: user.username,
        fullname: user.fullname,
        picture: user.picture,
        platform: platform as never,
        followers: user.followers,
        is_verified: user.is_verified,
      });
    }
  }, [user, platform, inList, addProfile, removeProfile]);

  if (!username) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-[var(--text-muted)] text-lg">Invalid profile</p>
          <Link
            to="/"
            className="mt-4 text-[var(--accent-indigo)] hover:underline"
          >
            Back to search
          </Link>
        </div>
      </AppLayout>
    );
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-4">
            <Loader2 className="h-7 w-7 animate-spin text-[var(--accent-indigo)]" />
          </div>
          <p className="text-[var(--text-secondary)]">Loading profile...</p>
        </div>
      </AppLayout>
    );
  }

  if (error || !user) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-red-400 text-lg mb-4">
            {error || "Profile not found"}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[var(--accent-indigo)] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to search
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" as const }}
          className="space-y-8"
        >
          {/* Profile Header Card */}
          <div className="relative rounded-2xl glass overflow-hidden">
            {/* Gradient top bar */}
            <div className="h-24 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 relative">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            </div>

            <div className="px-6 pb-6">
              {/* Avatar - overlapping the gradient */}
              <div className="flex flex-col sm:flex-row gap-5 items-start -mt-10">
                <img
                  src={user.picture}
                  alt={`${user.fullname}'s profile picture`}
                  className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover ring-4 ring-[var(--bg-primary)] shadow-xl shrink-0"
                />

                <div className="flex-1 min-w-0 pt-2 sm:pt-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-display)]">
                          @{user.username}
                        </h1>
                        <VerifiedBadge verified={user.is_verified} />
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-indigo-500/15 text-[var(--accent-indigo)] capitalize">
                          {user.type ||
                            getPlatformLabel(platform as never) ||
                            platform}
                        </span>
                      </div>
                      <p className="text-[var(--text-secondary)] mt-0.5">
                        {user.fullname}
                      </p>
                    </div>
                  </div>

                  {user.description && (
                    <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {user.description}
                    </p>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-5 flex-wrap">
                    <button
                      onClick={handleAddToList}
                      className={cn(
                        "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                        inList
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/25"
                          : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 active:scale-95",
                      )}
                    >
                      {inList ? (
                        <>
                          <Check className="h-4 w-4" />
                          Added to List
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Add to List
                        </>
                      )}
                    </button>

                    {user.url && (
                      <a
                        href={user.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-medium)] transition-all duration-200"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on platform
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] font-[var(--font-display)] mb-4">
              Profile Statistics
            </h2>
            <StatsGrid>
              <ProfileStat
                label="Followers"
                value={formatNumber(user.followers)}
                numericValue={user.followers}
              />
              <ProfileStat
                label="Engagement Rate"
                value={formatEngagementRate(user.engagement_rate)}
              />
              {user.posts_count !== undefined && (
                <ProfileStat
                  label="Posts"
                  value={formatNumber(user.posts_count)}
                  numericValue={user.posts_count}
                />
              )}
              {user.avg_likes !== undefined && (
                <ProfileStat
                  label="Avg Likes"
                  value={formatNumber(user.avg_likes)}
                  numericValue={user.avg_likes}
                />
              )}
              {user.avg_comments !== undefined && (
                <ProfileStat
                  label="Avg Comments"
                  value={formatNumber(user.avg_comments)}
                  numericValue={user.avg_comments}
                />
              )}
              {user.avg_views !== undefined && user.avg_views > 0 && (
                <ProfileStat
                  label="Avg Views"
                  value={formatNumber(user.avg_views)}
                  numericValue={user.avg_views}
                />
              )}
              {user.engagements !== undefined && (
                <ProfileStat
                  label="Engagements"
                  value={formatNumber(user.engagements)}
                  numericValue={user.engagements}
                />
              )}
              {user.total_likes !== undefined && (
                <ProfileStat
                  label="Total Likes"
                  value={formatNumber(user.total_likes)}
                  numericValue={user.total_likes}
                />
              )}
              {user.gender && (
                <ProfileStat label="Gender" value={user.gender} />
              )}
              {user.age_group && (
                <ProfileStat label="Age Group" value={user.age_group} />
              )}
              {user.geo?.country?.name && (
                <ProfileStat
                  label="Country"
                  value={user.geo.country.name}
                />
              )}
            </StatsGrid>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
