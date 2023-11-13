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
    fetchPosts() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=FollowingPostList.js.map