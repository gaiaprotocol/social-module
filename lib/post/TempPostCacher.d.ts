import Post from "../database-interface/Post.js";
export default class TempPostCacher<T extends Post> {
    private postMap;
    cache(mainPostId: number, data: {
        posts: T[];
        repostedPostIds: number[];
        likedPostIds: number[];
    }): void;
    get(mainPostId: number): {
        posts: T[];
        repostedPostIds: number[];
        likedPostIds: number[];
    } | undefined;
}
//# sourceMappingURL=TempPostCacher.d.ts.map