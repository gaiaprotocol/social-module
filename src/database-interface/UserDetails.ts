interface UserDetailsMetadata {}

export default interface UserDetails {
  user_id: string;
  wallet_address?: string;
  total_earned_trading_fees: string;
  display_name?: string;
  profile_image?: string;
  x_username?: string;
  metadata?: UserDetailsMetadata;
  follower_count: number;
  following_count: number;
  blocked: boolean;
  created_at: string;
  updated_at?: string;
}

export const UserDetailsSelectQuery = `*, total_earned_trading_fees::text`;

const isEqualMetadata = (a: UserDetailsMetadata, b: UserDetailsMetadata) => {
  return true;
};

export const isEqualUserDetails = (a: UserDetails, b: UserDetails) =>
  a.user_id === b.user_id &&
  a.wallet_address === b.wallet_address &&
  a.total_earned_trading_fees === b.total_earned_trading_fees &&
  a.display_name === b.display_name &&
  a.profile_image === b.profile_image &&
  a.x_username === b.x_username &&
  isEqualMetadata(a.metadata ?? {}, b.metadata ?? {}) &&
  a.follower_count === b.follower_count &&
  a.following_count === b.following_count &&
  a.blocked === b.blocked;
