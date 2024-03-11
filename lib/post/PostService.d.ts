import { SupabaseService } from "@common-module/app";
import Post from "../database-interface/Post.js";
export default abstract class PostService<T extends Post> extends SupabaseService<T> {
    private repostTableName;
    private likeTableName;
    constructor(postTableName: string, repostTableName: string, likeTableName: string, selectQuery: string, fetchLimit: number);
    abstract checkSigned(): void;
    protected notifyNewGlobalPost(post: T): void;
    protected enhancePostData(posts: T[]): {
        posts: T[];
        repostedPostIds: number[];
        likedPostIds: number[];
    };
    fetchPost(postId: number, lastCommentId: number | undefined, signedUserId: string | undefined): Promise<{
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
    fetchUserPosts(userId: string, lastPostId: number | undefined): Promise<{
        posts: T[];
        repostedPostIds: number[];
        likedPostIds: number[];
    }>;
    fetchUserCommentPosts(userId: string, lastPostId: number | undefined): Promise<{
        posts: T[];
        repostedPostIds: number[];
        likedPostIds: number[];
    }>;
    fetchLikedPosts(userId: string, lastLikedAt: string | undefined): Promise<{
        data: {
            posts: T[];
            repostedPostIds: number[];
            likedPostIds: number[];
        };
        lastLikedAt: string | undefined;
    }>;
    fetchReposts(userId: string, lastRepostedAt: string | undefined): Promise<{
        data: {
            posts: T[];
            repostedPostIds: number[];
            likedPostIds: number[];
        };
        lastRepostedAt: string | undefined;
    }>;
    findPosts(query: string, lastPostId: number | undefined, signedUserId: string | undefined): Promise<{
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