import { useState, useCallback, useMemo, Suspense, lazy } from "react";
import type { Platform } from "@/types";
import { AppLayout } from "@/components/app-layout";
import { PlatformFilter } from "./components/platform-filter";
import { SearchBar } from "./components/search-bar";
import { ProfileList } from "./components/profile-list";
import { ListDrawer } from "@/features/list/components/list-drawer";
import { extractProfiles, filterProfiles } from "@/lib/data-helpers";

const ProfileListPanel = lazy(() =>
  import("@/features/list/components/list-panel").then((m) => ({
    default: m.ListPanel,
  })),
);

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [showList, setShowList] = useState(false);

  const allProfiles = useMemo(
    () => extractProfiles(platform),
    [platform],
  );

  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery],
  );

  const handlePlatformChange = useCallback((p: Platform) => {
    setPlatform(p);
    setSearchQuery("");
  }, []);

  return (
    <>
      <AppLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Find Influencers
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Browse top creators across Instagram, YouTube, and TikTok
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <PlatformFilter
              selected={platform}
              onChange={handlePlatformChange}
            />
            <div className="sm:ml-auto flex items-center gap-3">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <button
                onClick={() => setShowList(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shrink-0"
                aria-label="Open selected profiles list"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 6h13" />
                  <path d="M8 12h13" />
                  <path d="M8 18h13" />
                  <path d="M3 6h.01" />
                  <path d="M3 12h.01" />
                  <path d="M3 18h.01" />
                </svg>
                My List
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
            <span>
              Showing {filtered.length} of {allProfiles.length} results
            </span>
            {searchQuery && (
              <span className="text-indigo-500 dark:text-indigo-400">
                · filtered by "{searchQuery}"
              </span>
            )}
          </div>

          <ProfileList
            profiles={filtered}
            platform={platform}
            query={searchQuery}
          />
        </div>
      </AppLayout>

      {showList && (
        <Suspense fallback={null}>
          <ListDrawer onClose={() => setShowList(false)}>
            <ProfileListPanel />
          </ListDrawer>
        </Suspense>
      )}
    </>
  );
}
