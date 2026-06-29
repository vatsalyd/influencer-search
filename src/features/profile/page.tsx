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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
          <p className="text-gray-500 text-lg">Invalid profile</p>
          <Link to="/" className="mt-4 text-indigo-600 hover:underline">
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
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-3" />
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </AppLayout>
    );
  }

  if (error || !user) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-red-500 dark:text-red-400 text-lg mb-4">
            {error || "Profile not found"}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:underline"
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
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <img
              src={user.picture}
              alt={`${user.fullname}'s profile picture`}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover ring-4 ring-gray-100 dark:ring-gray-800 shadow-md shrink-0"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      @{user.username}
                    </h1>
                    <VerifiedBadge verified={user.is_verified} />
                    <Badge variant="secondary" className="capitalize">
                      {user.type || getPlatformLabel(platform as never) || platform}
                    </Badge>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                    {user.fullname}
                  </p>
                </div>
              </div>

              {user.description && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {user.description}
                </p>
              )}

              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <Button
                  onClick={handleAddToList}
                  variant={inList ? "secondary" : "default"}
                  className={cn(
                    inList &&
                      "text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
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
                </Button>

                {user.url && (
                  <a
                    href={user.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View on platform
                  </a>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <StatsGrid>
            <ProfileStat
              label="Followers"
              value={formatNumber(user.followers)}
            />
            <ProfileStat
              label="Engagement Rate"
              value={formatEngagementRate(user.engagement_rate)}
            />
            {user.posts_count !== undefined && (
              <ProfileStat
                label="Posts"
                value={formatNumber(user.posts_count)}
              />
            )}
            {user.avg_likes !== undefined && (
              <ProfileStat
                label="Avg Likes"
                value={formatNumber(user.avg_likes)}
              />
            )}
            {user.avg_comments !== undefined && (
              <ProfileStat
                label="Avg Comments"
                value={formatNumber(user.avg_comments)}
              />
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <ProfileStat
                label="Avg Views"
                value={formatNumber(user.avg_views)}
              />
            )}
            {user.engagements !== undefined && (
              <ProfileStat
                label="Engagements"
                value={formatNumber(user.engagements)}
              />
            )}
            {user.total_likes !== undefined && (
              <ProfileStat
                label="Total Likes"
                value={formatNumber(user.total_likes)}
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
        </motion.div>
      </div>
    </AppLayout>
  );
}
