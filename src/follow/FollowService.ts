import { SupabaseService } from "common-app-module";
import Follow from "../database-interface/Follow.js";

class FollowService extends SupabaseService<Follow> {
  private followeeIds: Set<string> = new Set();

  constructor() {
    super("follows", "*", 1000);
    this.addAllowedEvents("follow", "unfollow");
  }

  public async fetchSignedUserFollows(userId: string) {
    const data = await this.safeSelect((b) => b.eq("follower_id", userId));
    for (const follow of data) {
      this.followeeIds.add(follow.followee_id);
    }
  }

  public follow(userId: string) {
    this.followeeIds.add(userId);
    this.fireEvent("follow", userId);
    this.safeInsert({ followee_id: userId });
  }

  public unfollow(userId: string) {
    this.followeeIds.delete(userId);
    this.fireEvent("unfollow", userId);
    this.safeDelete((b) => b.eq("followee_id", userId));
  }

  public isFollowing(userId: string) {
    return this.followeeIds.has(userId);
  }

  public toggleFollow(userId: string) {
    this.isFollowing(userId) ? this.unfollow(userId) : this.follow(userId);
  }
}

export default new FollowService();
