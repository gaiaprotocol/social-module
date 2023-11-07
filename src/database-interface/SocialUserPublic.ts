import { isEqualUserPublic, UserPublic } from "common-app-module";

export default interface SocialUserPublic extends UserPublic {
  wallet_address?: string;
  x_username?: string;
  follower_count: number;
  following_count: number;
}

export const isEqualSocialUserPublic = (
  a: SocialUserPublic,
  b: SocialUserPublic,
) =>
  isEqualUserPublic(a, b) &&
  a.wallet_address === b.wallet_address &&
  a.x_username === b.x_username &&
  a.follower_count === b.follower_count &&
  a.following_count === b.following_count;
