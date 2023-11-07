import { UserPublic } from "common-app-module";
export default interface SocialUserPublic extends UserPublic {
    wallet_address?: string;
    x_username?: string;
    follower_count: number;
    following_count: number;
}
export declare const isEqualSocialUserPublic: (a: SocialUserPublic, b: SocialUserPublic) => boolean;
//# sourceMappingURL=SocialUserPublic.d.ts.map