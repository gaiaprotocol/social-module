import { isEqualUserPublic } from "common-app-module";
export const SoFiUserPublicSelectQuery = `*, total_earned_trading_fees::text`;
export const isEqualSocialUserPublic = (a, b) => isEqualUserPublic(a, b) &&
    a.wallet_address === b.wallet_address &&
    a.total_earned_trading_fees === b.total_earned_trading_fees &&
    a.x_username === b.x_username &&
    a.follower_count === b.follower_count &&
    a.following_count === b.following_count;
//# sourceMappingURL=SoFiUserPublic.js.map