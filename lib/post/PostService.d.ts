import Post from "../database-interface/Post.js";
import MessageService from "../message/MessageService.js";
export default class PostService<T extends Post> extends MessageService<T> {
    private repostTableName;
    private likeTableName;
    constructor(postTableName: string, repostTableName: string, likeTableName: string, selectQuery: string, fetchLimit: number);
    fetchUserRepostedPosts(postIds: number[], userId: string): Promise<number[]>;
    fetchUserLikedPosts(postIds: number[], userId: string): Promise<number[]>;
}
//# sourceMappingURL=PostService.d.ts.map