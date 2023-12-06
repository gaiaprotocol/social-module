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
    enhancePostData(posts) {
        const _post = Supabase.safeResult(posts ?? []);
        const repostedPostIds = [];
        const likedPostIds = [];
        for (const post of _post) {
            post.author = {
                user_id: post.author,
                display_name: post.author_display_name,
                profile_image: post.author_profile_image,
                profile_image_thumbnail: post.author_profile_image_thumbnail,
                x_username: post.author_x_username,
            };
            if (post.reposted)
                repostedPostIds.push(post.id);
            if (post.liked)
                likedPostIds.push(post.id);
        }
        return {
            posts: _post,
            repostedPostIds,
            likedPostIds,
        };
    }
    async fetchPost(postId, signedUserId) {
        const { data, error } = await Supabase.client.rpc("get_post_and_comments", {
            p_post_id: postId,
            max_comment_count: this.fetchLimit,
            signed_user_id: signedUserId,
        });
        if (error)
            throw error;
        return this.enhancePostData(data ?? []);
    }
    async fetchGlobalPosts(lastPostId, signedUserId) {
        const { data, error } = await Supabase.client.rpc("get_global_posts", {
            last_post_id: lastPostId,
            max_count: this.fetchLimit,
            signed_user_id: signedUserId,
        });
        if (error)
            throw error;
        return this.enhancePostData(data ?? []);
    }
    async fetchFollowingPosts(userId, lastPostId) {
        const { data, error } = await Supabase.client.rpc("get_following_posts", {
            p_user_id: userId,
            last_post_id: lastPostId,
            max_count: this.fetchLimit,
        });
        if (error)
            throw error;
        return this.enhancePostData(data ?? []);
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