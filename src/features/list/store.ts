import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Platform, SelectedProfile } from "@/types";

const LIST_STORAGE_KEY = "influencer-search-selected-list";

const storageFallback = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

const getStorage = () =>
  typeof window !== "undefined" ? localStorage : storageFallback;

interface ListState {
  profiles: SelectedProfile[];
  addProfile: (profile: {
    user_id: string;
    username: string;
    fullname: string;
    picture: string;
    platform: Platform;
    followers: number;
    is_verified: boolean;
  }) => { success: boolean; reason?: string };
  removeProfile: (user_id: string) => void;
  clearList: () => void;
  isInList: (user_id: string) => boolean;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      profiles: [],

      addProfile: (profile) => {
        const existing = get().profiles.find(
          (p) => p.user_id === profile.user_id,
        );
        if (existing) {
          return { success: false, reason: "already_in_list" };
        }
        set((state) => ({
          profiles: [
            ...state.profiles,
            { ...profile, added_at: Date.now() },
          ],
        }));
        return { success: true };
      },

      removeProfile: (user_id) => {
        set((state) => ({
          profiles: state.profiles.filter((p) => p.user_id !== user_id),
        }));
      },

      clearList: () => {
        set({ profiles: [] });
      },

      isInList: (user_id) => {
        return get().profiles.some((p) => p.user_id === user_id);
      },
    }),
    {
      name: LIST_STORAGE_KEY,
      storage: createJSONStorage(getStorage),
    },
  ),
);
