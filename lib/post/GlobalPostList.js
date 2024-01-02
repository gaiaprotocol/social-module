import { msg } from "@common-module/app";
import PostList from "./PostList.js";
export default class GlobalPostList extends PostList {
    constructor(postService, options, interactions, initialLoadingAnimation) {
        super(".global-post-list", postService, {
            storeName: "global-posts",
            emptyMessage: msg("global-post-list-empty-message"),
            ...options,
        }, interactions, initialLoadingAnimation);
        this.onDelegate(postService, "newGlobalPost", (post) => this.addNewPost(post));
    }
    async fetchPosts() {
        const result = await this.postService.fetchGlobalPosts(this.lastPostId, this.options.signedUserId);
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
//# sourceMappingURL=GlobalPostList.js.map