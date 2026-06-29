import { describe, it, expect, beforeEach } from "vitest";
import { useListStore } from "../store";

describe("useListStore", () => {
  beforeEach(() => {
    const { clearList } = useListStore.getState();
    clearList();
  });

  const testProfile = {
    user_id: "123",
    username: "testuser",
    fullname: "Test User",
    picture: "https://example.com/avatar.jpg",
    platform: "instagram" as const,
    followers: 5000,
    is_verified: true,
  };

  it("adds a profile to the list", () => {
    const { addProfile } = useListStore.getState();
    const result = addProfile(testProfile);

    expect(result.success).toBe(true);
    expect(useListStore.getState().profiles).toHaveLength(1);
    expect(useListStore.getState().profiles[0].username).toBe("testuser");
  });

  it("prevents duplicate profiles", () => {
    const { addProfile } = useListStore.getState();
    addProfile(testProfile);
    const result = addProfile(testProfile);

    expect(result.success).toBe(false);
    expect(result.reason).toBe("already_in_list");
    expect(useListStore.getState().profiles).toHaveLength(1);
  });

  it("removes a profile by user_id", () => {
    const { addProfile, removeProfile } = useListStore.getState();
    addProfile(testProfile);
    expect(useListStore.getState().profiles).toHaveLength(1);

    removeProfile("123");
    expect(useListStore.getState().profiles).toHaveLength(0);
  });

  it("clears all profiles", () => {
    const { addProfile, clearList } = useListStore.getState();
    addProfile(testProfile);
    addProfile({ ...testProfile, user_id: "456", username: "user2" });
    expect(useListStore.getState().profiles).toHaveLength(2);

    clearList();
    expect(useListStore.getState().profiles).toHaveLength(0);
  });

  it("checks if a profile is in the list", () => {
    const { addProfile, isInList } = useListStore.getState();
    addProfile(testProfile);

    expect(isInList("123")).toBe(true);
    expect(isInList("999")).toBe(false);
  });
});
