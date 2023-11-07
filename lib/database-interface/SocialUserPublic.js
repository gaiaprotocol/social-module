import { isEqualUserPublic } from "common-app-module";
export const isEqualSocialUserPublic = (a, b) => isEqualUserPublic(a, b) &&
    a.wallet_address === b.wallet_address &&
    a.x_username === b.x_username &&
    a.follower_count === b.follower_count &&
    a.following_count === b.following_count;
//# sourceMappingURL=SocialUserPublic.js.map