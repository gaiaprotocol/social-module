import { isEqualUserPublic, UserPublic } from "common-app-module";

export default interface SoFiUserPublic extends UserPublic {
  wallet_address?: string;
  total_earned_trading_fees: string;
  x_username?: string;
  follower_count: number;
  following_count: number;
}

export const isEqualSocialUserPublic = (
  a: SoFiUserPublic,
  b: SoFiUserPublic,
) =>
  isEqualUserPublic(a, b) &&
  a.wallet_address === b.wallet_address &&
  a.total_earned_trading_fees === b.total_earned_trading_fees &&
  a.x_username === b.x_username &&
  a.follower_count === b.follower_count &&
  a.following_count === b.following_count;
