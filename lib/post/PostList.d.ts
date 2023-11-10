import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
export default abstract class PostList extends SocialComponent {
    private options;
    private interactions;
    private store;
    constructor(options: {
        storeName: string;
        signedUserId?: string;
        emptyMessage: string;
    }, interactions: PostInteractions);
    private addPostItem;
    protected abstract fetchPosts(): Promise<{
        posts: {
            posts: Post[];
            mainPostId: number;
        }[];
        repostedPostIds: number[];
        likedPostIds: number[];
    }>;
    private refresh;
}
//# sourceMappingURL=PostList.d.ts.map