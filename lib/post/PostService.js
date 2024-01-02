import { Supabase } from "@common-module/app";
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
        const _post = Supabase.safeResult(posts);
        const repostedPostIds = [];
        const likedPostIds = [];
        for (const post of _post) {
            post.author = {
                user_id: post.author,
                display_name: post.author_display_name,
                avatar: post.author_avatar,
                avatar_thumb: post.author_avatar_thumb,
                stored_avatar: post.author_stored_avatar,
                stored_avatar_thumb: post.author_stored_avatar_thumb,
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
    async fetchPost(postId, lastCommentId, signedUserId) {
        const { data, error } = await Supabase.client.rpc("get_post_and_comments", {
            p_post_id: postId,
            last_comment_id: lastCommentId,
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
    async fetchUserPosts(userId, lastPostId) {
        const { data, error } = await Supabase.client.rpc("get_user_posts", {
            p_user_id: userId,
            last_post_id: lastPostId,
            max_count: this.fetchLimit,
        });
        if (error)
            throw error;
        return this.enhancePostData(data ?? []);
    }
    async fetchUserCommentPosts(userId, lastPostId) {
        const { data, error } = await Supabase.client.rpc("get_user_comment_posts", {
            p_user_id: userId,
            last_post_id: lastPostId,
            max_count: this.fetchLimit,
        });
        if (error)
            throw error;
        return this.enhancePostData(data ?? []);
    }
    async fetchLikedPosts(userId, lastLikedAt) {
        const { data, error } = await Supabase.client.rpc("get_liked_posts", {
            p_user_id: userId,
            last_liked_at: lastLikedAt,
            max_count: this.fetchLimit,
        });
        if (error)
            throw error;
        if (data && data.length > 0) {
            const mostRecentLikedAt = data.reduce((latest, post) => {
                const likeTime = new Date(post.like_created_at);
                return latest > likeTime ? latest : likeTime;
            }, new Date(0));
            lastLikedAt = mostRecentLikedAt.toISOString();
        }
        return {
            data: this.enhancePostData(data ?? []),
            lastLikedAt,
        };
    }
    async fetchReposts(userId, lastRepostedAt) {
        const { data, error } = await Supabase.client.rpc("get_reposts", {
            p_user_id: userId,
            last_reposted_at: lastRepostedAt,
            max_count: this.fetchLimit,
        });
        if (error)
            throw error;
        if (data) {
            const mostRecentRepostedAt = data.reduce((latest, post) => {
                const repostTime = new Date(post.repost_created_at);
                return latest > repostTime ? latest : repostTime;
            }, new Date(0));
            lastRepostedAt = mostRecentRepostedAt.toISOString();
        }
        return {
            data: this.enhancePostData(data ?? []),
            lastRepostedAt,
        };
    }
    async findPosts(query, lastPostId, signedUserId) {
        const { data, error } = await Supabase.client.rpc("find_posts", {
            p_user_id: signedUserId,
            search_string: query,
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