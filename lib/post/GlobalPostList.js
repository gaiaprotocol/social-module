import { msg } from "common-app-module";
import PostList from "./PostList.js";
export default class GlobalPostList extends PostList {
    constructor(postService, options, interactions, loadingAnimation) {
        super(".global-post-list", postService, {
            storeName: "global-posts",
            emptyMessage: msg("global-post-list-empty-message"),
            ...options,
        }, interactions, loadingAnimation);
    }
    async fetchPosts() {
        const posts = await this.postService.fetchGlobalMessages(this.lastPostId);
        return posts.map((p) => ({
            posts: [p],
            mainPostId: p.id,
        }));
    }
}
//# sourceMappingURL=GlobalPostList.js.map