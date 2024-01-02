import { UserPublic } from "common-app-module";

export default interface SoFiUserPublic extends UserPublic {
  x_username?: string;
  follower_count: number;
  following_count: number;
}
