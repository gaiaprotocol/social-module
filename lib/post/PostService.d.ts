import Post from "../database-interface/Post.js";
import MessageService from "../message/MessageService.js";
export default class PostService<T extends Post> extends MessageService<T> {
    private repostTableName;
    private likeTableName;
    constructor(postTableName: string, repostTableName: string, likeTableName: string, selectQuery: string, fetchLimit: number);
    protected notifyNewGlobalPost(post: T): void;
    protected enhancePostData(posts: T[]): {
        posts: T[];
        repostedPostIds: number[];
        likedPostIds: number[];
    };
    fetchPost(postId: number, signedUserId: string | undefined): Promise<{
        posts: T[];
        repostedPostIds: number[];
        likedPostIds: number[];
    }>;
    fetchGlobalPosts(lastPostId: number | undefined, signedUserId: string | undefined): Promise<{
        posts: T[];
        repostedPostIds: number[];
        likedPostIds: number[];
    }>;
    fetchFollowingPosts(userId: string, lastPostId: number | undefined): Promise<{
        posts: T[];
        repostedPostIds: number[];
        likedPostIds: number[];
    }>;
    repost(postId: number): Promise<void>;
    unrepost(postId: number): Promise<void>;
    like(postId: number): Promise<void>;
    unlike(postId: number): Promise<void>;
}
//# sourceMappingURL=PostService.d.ts.map