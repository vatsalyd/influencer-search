# InfluencerSearch

A modern influencer discovery platform built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Zustand**.

Find and shortlist top creators across Instagram, YouTube, and TikTok.

## Quick Start

```bash
npm install
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run test     # Run tests
npm run lint     # Run ESLint
```

## What Changed

### 1. Bug Fixes

| Bug | Location | Fix |
|-----|----------|-----|
| Case-sensitive username search | `dataHelpers.ts` | Added `.toLowerCase()` to username matching |
| Wrong engagement rate multiplier (×10000) | `ProfileDetailPage` | Changed to ×100 (correct percentage) |
| Dead `clickCount` state/logging | `SearchPage` | Removed unused state and handler |
| Duplicate follower formatter | `ProfileCard` & `formatters.ts` | Removed local function, shared utility instead |
| Useless `data-search` attribute | `ProfileCard` | Removed debug attribute |
| `loaded: true` even on error | `ProfileDetailPage` | Proper error/loading state separation |
| Unused but imported `SearchBar` component | `PlatformFilter` | Consolidated search into feature components |
| Incompatible `react-beautiful-dnd` | `package.json` | Removed (incompatible with React 19) |
| `ignoreDeprecations` in tsconfig | `tsconfig.app.json` | Removed invalid option |
| Vague `<title>` | `index.html` | Changed to "InfluencerSearch — Find Top Creators" |

### 2. UI/UX Redesign

- **Modern card-based layout** with hover effects, shadows, and subtle animations
- **Platform filter buttons** with distinct color theming (Pink/Red/Dark)
- **Search bar** with search icon, proper responsive layout
- **Search result highlighting** — matched text is highlighted with a subtle indigo background
- **Profile detail page** with animated entry, stats grid, and clear information hierarchy
- **Sticky header** with backdrop blur
- **Dark mode support** via Tailwind CSS `dark:` variants
- **Responsive design** — works on mobile through desktop
- **Accessibility improvements** — `aria-label`, `aria-pressed`, `role` attributes, semantic HTML
- **Loading states** with spinner animation
- **Error states** for invalid profiles

### 3. State Management (Zustand)

Replaced the implicit React Context pattern with a dedicated **Zustand store** with `persist` middleware:

```ts
// src/features/list/store.ts
export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      profiles: [],
      addProfile,   // Add with duplicate prevention
      removeProfile, // Remove by user_id
      clearList,     // Clear all
      isInList,      // Check existence
    }),
    { name: "influencer-search-selected-list" }
  ),
);
```

- **Persistent** — list survives page refresh via `localStorage`
- **Duplicate prevention** — returns `{ success: false, reason: "already_in_list" }`
- **SSR-safe** — falls back to in-memory storage in non-browser environments
- **No React Context boilerplate** — no providers, no wrapping components

### 4. "Add to List" Feature

- **Add** profiles from search results or profile detail page
- **Remove** profiles with a single click
- **Duplicate prevention** — already-added profiles show "Added" state
- **Persistent** — list data survives page refresh
- **Slide-in drawer** from the right to view and manage the list
- **Time-ago indicators** showing when each profile was added
- **Quick navigation** from list items to profile detail pages

### 5. Code Quality & Structure

- **Feature-based folder structure** (`features/search/`, `features/profile/`, `features/list/`)
- **Shared UI primitives** in `components/ui/` (Button, Card, Input, Badge, etc.)
- **Custom hooks** for data loading
- **Proper TypeScript types** with interfaces for all data shapes
- **ESLint** with recommended + React hooks + React Refresh configs
- **Clean component separation** — each component has a single responsibility

### 6. Performance Optimizations

- **`React.memo`** on `ProfileCard` to prevent re-renders of unchanged cards
- **`useMemo`** for filtered profile list and platform data extraction
- **`useCallback`** for event handlers passed to child components
- **Lazy loading** of the list panel via `React.lazy()` + `Suspense`
- **`loading="lazy"`** on all profile images
- **Tree-shakeable** icon imports

### 7. Tests

23 passing tests across 3 test suites:

- **`formatters.test.ts`** — `formatFollowers`, `formatEngagementRate`, `formatNumber`, `timeAgo`
- **`data-helpers.test.ts`** — `filterProfiles` (case-insensitivity, trimming, edge cases), `getPlatformLabel`, `PLATFORMS`
- **`store.test.ts`** — add, duplicate prevention, remove, clear, `isInList`

Run with: `npm run test`

## Libraries Added

| Library | Version | Purpose |
|---------|---------|---------|
| `zustand` | ^5.0 | State management with persist middleware |
| `framer-motion` | ^12 | Slide-in drawer animation, page transitions |
| `lucide-react` | ^1.22 | Consistent icon set |
| `class-variance-authority` | ^0.7 | UI component variant props |
| `clsx` | ^2.1 | Conditional class merging |
| `tailwind-merge` | ^3.6 | Smart Tailwind class merging |
| `vitest` | ^4.1 (dev) | Test runner |
| `@testing-library/jest-dom` | ^6.9 (dev) | DOM assertion matchers |

## Assumptions & Trade-offs

- **Data is static JSON** — The app reads from pre-bundled JSON files. In production this would be an API.
- **Profile loading uses Vite's `import.meta.glob`** — This is efficient for static data but wouldn't work for dynamic API calls.
- **No authentication** — The app is single-user; multi-user support would require a backend.
- **Brand icons are inline SVGs** — Lucide React v1 doesn't include brand icons (Instagram, YouTube, TikTok) for licensing reasons, so I created clean SVG approximations.
- **One list per device** — localStorage persistence means the list is local; cross-device sync would need a backend.
- **No routing state** — Search query and platform filter reset on navigation. `useSearchParams` could be used for shareable URLs.
- **No analytics** — The dead `clickCount` was removed rather than connected to an analytics SDK.

## Remaining Improvements

Given more time, I would add:

- [ ] **React Router `useSearchParams`** for the search page so filters survive navigation
- [ ] **Integration tests** for the search page and profile page with MSW
- [ ] **Drag-and-drop** list reordering (using `@dnd-kit` instead of deprecated `react-beautiful-dnd`)
- [ ] **Virtual scrolling** for large profile lists (e.g., `@tanstack/react-virtual`)
- [ ] **E2E tests** with Playwright
- [ ] **Error boundary** component for React error recovery
- [ ] **Keyboard navigation** improvements (e.g., arrow keys in search results)
- [ ] **Skeleton loading states** instead of the spinner
- [ ] **CI/CD pipeline** (GitHub Actions for lint → test → build)
- [ ] **Deployment** to Vercel or Netlify
