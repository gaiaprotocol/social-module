import { msg } from "common-app-module";
import PostList from "./PostList.js";
export default class FollowingPostList extends PostList {
    constructor(postService, options, interactions, initialLoadingAnimation) {
        super(".following-post-list", postService, {
            storeName: "following-posts",
            emptyMessage: msg("following-post-list-empty-message"),
            ...options,
        }, interactions, initialLoadingAnimation);
    }
    async fetchPosts() {
        const result = await this.postService.fetchFollowingPosts(this.options.signedUserId, this.lastPostId);
        return {
            fetchedPosts: result.posts.map((p) => ({
                posts: [p],
                mainPostId: p.id,
            })),
            repostedPostIds: result.repostedPostIds,
            likedPostIds: result.likedPostIds,
        };
    }
}
//# sourceMappingURL=FollowingPostList.js.map