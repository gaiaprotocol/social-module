interface UserPublicMetadata {
}
export default interface UserPublic {
    user_id: string;
    wallet_address?: string;
    display_name?: string;
    profile_image?: string;
    x_username?: string;
    metadata?: UserPublicMetadata;
    follower_count: number;
    following_count: number;
    blocked: boolean;
    created_at: string;
    updated_at?: string;
}
export declare const isEqualUserPublic: (a: UserPublic, b: UserPublic) => boolean;
export {};
//# sourceMappingURL=UserPublic.d.ts.map