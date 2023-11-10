import Post from "../database-interface/Post.js";
declare class TempPostCacher {
    private postMap;
    cache(post: Post): void;
    get(postId: number): Post | undefined;
}
declare const _default: TempPostCacher;
export default _default;
//# sourceMappingURL=TempPostCacher.d.ts.map