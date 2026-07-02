import { useState, useCallback, useMemo, Suspense, lazy, useRef } from "react";
import type { Platform } from "@/types";
import { AppLayout } from "@/components/app-layout";
import { HeroSection } from "./components/hero-section";
import { PlatformFilter } from "./components/platform-filter";
import { SearchBar } from "./components/search-bar";
import { ProfileList } from "./components/profile-list";
import { ListDrawer } from "@/features/list/components/list-drawer";
import { extractProfiles, filterProfiles } from "@/lib/data-helpers";
import { useListStore } from "@/features/list/store";
import { List } from "lucide-react";

const ProfileListPanel = lazy(() =>
  import("@/features/list/components/list-panel").then((m) => ({
    default: m.ListPanel,
  })),
);

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const listCount = useListStore((s) => s.profiles.length);

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

  const handleSearchFocus = useCallback(() => {
    searchRef.current?.focus();
    document.getElementById("search")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <AppLayout>
        <div className="space-y-8">
          {/* Hero Section */}
          <HeroSection onSearchFocus={handleSearchFocus} />

          {/* Search Area */}
          <section id="search" className="scroll-mt-24">
            {/* Section Header */}
            <div className="flex flex-col gap-1 mb-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[var(--font-display)]">
                Browse Creators
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Filter by platform and search across thousands of verified
                profiles
              </p>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <PlatformFilter
                selected={platform}
                onChange={handlePlatformChange}
              />
              <div className="sm:ml-auto flex items-center gap-3">
                <SearchBar
                  ref={searchRef}
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
                <button
                  onClick={() => setShowList(true)}
                  className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass glass-hover text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200 shrink-0"
                  aria-label="Open selected profiles list"
                >
                  <List className="h-4 w-4" />
                  <span className="hidden sm:inline">My List</span>
                  {listCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-[10px] font-bold text-white shadow-lg shadow-indigo-500/30">
                      {listCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-4">
              <span>
                Showing {filtered.length} of {allProfiles.length} results
              </span>
              {searchQuery && (
                <span className="text-[var(--accent-indigo)]">
                  · filtered by &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </div>

            {/* Profile Grid */}
            <ProfileList
              profiles={filtered}
              platform={platform}
              query={searchQuery}
            />
          </section>
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
