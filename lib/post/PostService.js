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
        const posts = Supabase.safeResult(data) ?? [];
        for (const post of posts) {
            post.author = {
                user_id: post.author,
                display_name: post.author_display_name,
                profile_image: post.author_profile_image,
                profile_image_thumbnail: post.author_profile_image_thumbnail,
                x_username: post.author_x_username,
            };
        }
        return posts;
    }
    async fetchUserRepostedPosts(postIds, userId) {
        const data = await Supabase.safeFetch(this.repostTableName, (b) => b.select("post_id").in("post_id", postIds).eq("user_id", userId));
        return data ? data.map((d) => d.post_id) : [];
    }
    async fetchUserLikedPosts(postIds, userId) {
        const data = await Supabase.safeFetch(this.likeTableName, (b) => b.select("post_id").in("post_id", postIds).eq("user_id", userId));
        return data ? data.map((d) => d.post_id) : [];
    }
    async repost(postId) {
        const { error } = await Supabase.client.from(this.repostTableName).insert({
            post_id: postId,
        });
        if (error)
            throw error;
    }
    async unrepost(postId) {
        const { error } = await Supabase.client.from(this.repostTableName).delete()
            .eq("post_id", postId);
        if (error)
            throw error;
    }
    async like(postId) {
        const { error } = await Supabase.client.from(this.likeTableName).insert({
            post_id: postId,
        });
        if (error)
            throw error;
    }
    async unlike(postId) {
        const { error } = await Supabase.client.from(this.likeTableName).delete()
            .eq("post_id", postId);
        if (error)
            throw error;
    }
}
//# sourceMappingURL=PostService.js.map