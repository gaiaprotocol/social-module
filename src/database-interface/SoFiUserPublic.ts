import { UserPublic } from "common-app-module";

export default interface SoFiUserPublic extends UserPublic {
  wallet_address?: string;
  total_earned_trading_fees: string;
  x_username?: string;
  follower_count: number;
  following_count: number;
}

export const SoFiUserPublicSelectQuery = `*, total_earned_trading_fees::text`;
