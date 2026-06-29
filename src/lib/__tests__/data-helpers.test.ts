import { describe, it, expect } from "vitest";
import { filterProfiles, getPlatformLabel, PLATFORMS } from "../data-helpers";
import type { UserProfileSummary } from "@/types";

const mockProfiles: UserProfileSummary[] = [
  {
    user_id: "1",
    username: "testuser",
    url: "https://example.com",
    picture: "",
    fullname: "Test User",
    is_verified: true,
    followers: 1000,
  },
  {
    user_id: "2",
    username: "AnotherUser",
    url: "https://example.com",
    picture: "",
    fullname: "Another Person",
    is_verified: false,
    followers: 500,
  },
  {
    user_id: "3",
    username: "someone_else",
    url: "https://example.com",
    picture: "",
    fullname: "Someone Else",
    is_verified: true,
    followers: 2000,
  },
];

describe("filterProfiles", () => {
  it("returns all profiles when query is empty", () => {
    expect(filterProfiles(mockProfiles, "")).toHaveLength(3);
  });

  it("filters by username case-insensitively", () => {
    const result = filterProfiles(mockProfiles, "TESTUSER");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("testuser");
  });

  it("filters by fullname case-insensitively", () => {
    const result = filterProfiles(mockProfiles, "another");
    expect(result).toHaveLength(1);
    expect(result[0].fullname).toBe("Another Person");
  });

  it("returns empty array when no matches", () => {
    expect(filterProfiles(mockProfiles, "nonexistent")).toHaveLength(0);
  });

  it("trims whitespace from query", () => {
    const result = filterProfiles(mockProfiles, "  testuser  ");
    expect(result).toHaveLength(1);
  });
});

describe("getPlatformLabel", () => {
  it("returns correct labels", () => {
    expect(getPlatformLabel("instagram")).toBe("Instagram");
    expect(getPlatformLabel("youtube")).toBe("YouTube");
    expect(getPlatformLabel("tiktok")).toBe("TikTok");
  });
});

describe("PLATFORMS", () => {
  it("contains all three platforms", () => {
    expect(PLATFORMS).toEqual(["instagram", "youtube", "tiktok"]);
  });
});
