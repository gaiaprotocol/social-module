import { SupabaseService } from "@common-module/app";
class FollowService extends SupabaseService {
    followeeIds = new Set();
    constructor() {
        super("follows", "*", 1000);
        this.addAllowedEvents("follow", "unfollow");
    }
    async fetchSignedUserFollows(userId) {
        const data = await this.safeSelect((b) => b.eq("follower_id", userId));
        for (const follow of data) {
            this.followeeIds.add(follow.followee_id);
        }
    }
    follow(userId) {
        this.followeeIds.add(userId);
        this.fireEvent("follow", userId);
        this.safeInsert({ followee_id: userId });
    }
    unfollow(userId) {
        this.followeeIds.delete(userId);
        this.fireEvent("unfollow", userId);
        this.safeDelete((b) => b.eq("followee_id", userId));
    }
    isFollowing(userId) {
        return this.followeeIds.has(userId);
    }
    toggleFollow(userId) {
        this.isFollowing(userId) ? this.unfollow(userId) : this.follow(userId);
    }
}
export default new FollowService();
//# sourceMappingURL=FollowService.js.map