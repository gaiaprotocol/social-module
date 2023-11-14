import Post from "../database-interface/Post.js";
import MessageService from "../message/MessageService.js";
export default class PostService<T extends Post> extends MessageService<T> {
    private repostTableName;
    private likeTableName;
    constructor(postTableName: string, repostTableName: string, likeTableName: string, selectQuery: string, fetchLimit: number);
    protected notifyNewGlobalPost(post: T): void;
    fetchFollowingPosts(userId: string, lastPostId?: number): Promise<T[]>;
    fetchUserRepostedPosts(postIds: number[], userId: string): Promise<number[]>;
    fetchUserLikedPosts(postIds: number[], userId: string): Promise<number[]>;
    repost(postId: number): Promise<void>;
    unrepost(postId: number): Promise<void>;
    like(postId: number): Promise<void>;
    unlike(postId: number): Promise<void>;
}
//# sourceMappingURL=PostService.d.ts.map