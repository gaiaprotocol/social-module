import Post from "../database-interface/Post.js";
export default class TempPostCacher<T extends Post> {
    private postMap;
    cache(post: T): void;
    get(postId: number): T | undefined;
}
//# sourceMappingURL=TempPostCacher.d.ts.map