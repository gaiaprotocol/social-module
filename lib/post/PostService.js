import { Supabase } from "common-app-module";
import MessageService from "../message/MessageService.js";
export default class PostService extends MessageService {
    repostTableName;
    likeTableName;
    constructor(postTableName, repostTableName, likeTableName, selectQuery, fetchLimit) {
        super(postTableName, selectQuery, fetchLimit);
        this.repostTableName = repostTableName;
        this.likeTableName = likeTableName;
        this.addAllowedEvents("newGlobalPost");
    }
    notifyNewGlobalPost(post) {
        this.fireEvent("newGlobalPost", post);
    }
    async fetchFollowingPosts(userId, lastPostId) {
        const { data, error } = await Supabase.client.rpc("get_following_posts", {
            p_user_id: userId,
            last_post_id: lastPostId,
            max_count: this.fetchLimit,
        });
        if (error)
            throw error;
        return Supabase.safeResult(data) ?? [];
    }
    async fetchUserRepostedPosts(postIds, userId) {
        const data = await Supabase.safeFetch(this.repostTableName, (b) => b.select("post_id").in("post_id", postIds).eq("user_id", userId));
        return data ? data.map((d) => d.post_id) : [];
    }
    async fetchUserLikedPosts(postIds, userId) {
        const data = await Supabase.safeFetch(this.likeTableName, (b) => b.select("post_id").in("post_id", postIds).eq("user_id", userId));
        return data ? data.map((d) => d.post_id) : [];
    }
}
//# sourceMappingURL=PostService.js.map