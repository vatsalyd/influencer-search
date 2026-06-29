export type Platform = "instagram" | "youtube" | "tiktok";

export interface UserProfileSummary {
  user_id: string;
  username: string;
  url: string;
  picture: string;
  fullname: string;
  is_verified: boolean;
  followers: number;
  engagements?: number;
  engagement_rate?: number;
  handle?: string;
  avg_views?: number;
}

export interface SearchAccount {
  account: {
    user_profile: UserProfileSummary;
    audience_source: string;
  };
}

export interface SearchData {
  total: number;
  accounts: SearchAccount[];
}

export interface FullUserProfile extends UserProfileSummary {
  type?: string;
  description?: string;
  is_business?: boolean;
  is_hidden?: boolean;
  posts_count?: number;
  avg_likes?: number;
  avg_comments?: number;
  avg_reels_plays?: number;
  avg_shares?: number;
  avg_saves?: number;
  total_likes?: number;
  gender?: string;
  age_group?: string;
  language?: { code: string; name: string };
  geo?: {
    country: {
      id: number;
      name: string;
      code: string;
    };
  };
  contacts?: {
    type: string;
    value: string;
    formatted_value: string;
    checked?: boolean;
  }[];
  similar_users?: Partial<UserProfileSummary>[];
  top_posts?: unknown[];
  recent_posts?: unknown[];
  stat_history?: unknown[];
}

export interface ProfileDetailResponse {
  cached?: boolean;
  data: {
    success: boolean;
    user_profile: FullUserProfile;
  };
}

export interface SelectedProfile {
  user_id: string;
  username: string;
  fullname: string;
  picture: string;
  platform: Platform;
  followers: number;
  is_verified: boolean;
  added_at: number;
}
