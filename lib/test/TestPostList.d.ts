import Post from "../database-interface/Post.js";
import PostList from "../post/PostList.js";
export default class TestPostList extends PostList<Post> {
    constructor();
    protected fetchPosts(): Promise<{
        fetchedPosts: {
            posts: Post[];
            mainPostId: number;
        }[];
        repostedPostIds: number[];
        likedPostIds: number[];
    }>;
}
//# sourceMappingURL=TestPostList.d.ts.map