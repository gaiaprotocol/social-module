import { msg } from "common-app-module";
import PostList from "./PostList.js";
export default class FollowingPostList extends PostList {
    constructor(postService, options, interactions, loadingAnimation) {
        super(".following-post-list", postService, {
            storeName: "following-posts",
            emptyMessage: msg("following-post-list-empty-message"),
            ...options,
        }, interactions, loadingAnimation);
    }
    async fetchPosts() {
        const posts = await this.postService.fetchFollowingPosts(this.options.signedUserId, this.lastPostId);
        return posts.map((p) => ({
            posts: [p],
            mainPostId: p.id,
        }));
    }
}
//# sourceMappingURL=FollowingPostList.js.map