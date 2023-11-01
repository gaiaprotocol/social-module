interface UserDetailsMetadata {
}
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
export declare const DefaultUserDetails: UserDetails;
export declare const UserDetailsSelectQuery = "*, total_earned_trading_fees::text";
export declare const isEqualUserDetails: (a: UserDetails, b: UserDetails) => boolean;
export {};
//# sourceMappingURL=UserDetails.d.ts.map