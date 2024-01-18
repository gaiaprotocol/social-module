import { UserPublic } from "@common-module/app";

export default interface SocialUserPublic extends UserPublic {
  x_username?: string;
  follower_count: number;
  following_count: number;
}
