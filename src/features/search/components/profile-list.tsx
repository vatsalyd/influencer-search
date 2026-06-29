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
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4 opacity-30">🔍</div>
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
          No profiles found
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
          Try a different search term or platform
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          query={query}
        />
      ))}
    </div>
  );
}
