import { SupabaseService } from "@common-module/app";
import Follow from "../database-interface/Follow.js";
declare class FollowService extends SupabaseService<Follow> {
    private followeeIds;
    constructor();
    fetchSignedUserFollows(userId: string): Promise<void>;
    follow(userId: string): void;
    unfollow(userId: string): void;
    isFollowing(userId: string): boolean;
    toggleFollow(userId: string): void;
}
declare const _default: FollowService;
export default _default;
//# sourceMappingURL=FollowService.d.ts.map