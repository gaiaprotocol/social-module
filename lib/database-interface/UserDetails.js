export const DefaultUserDetails = {
    user_id: "",
    total_earned_trading_fees: "0",
    follower_count: 0,
    following_count: 0,
    blocked: false,
    created_at: "-infinity",
};
export const UserDetailsSelectQuery = `*, total_earned_trading_fees::text`;
const isEqualMetadata = (a, b) => {
    return true;
};
export const isEqualUserDetails = (a, b) => a.user_id === b.user_id &&
    a.wallet_address === b.wallet_address &&
    a.total_earned_trading_fees === b.total_earned_trading_fees &&
    a.display_name === b.display_name &&
    a.profile_image === b.profile_image &&
    a.x_username === b.x_username &&
    isEqualMetadata(a.metadata ?? {}, b.metadata ?? {}) &&
    a.follower_count === b.follower_count &&
    a.following_count === b.following_count &&
    a.blocked === b.blocked;
//# sourceMappingURL=UserDetails.js.map