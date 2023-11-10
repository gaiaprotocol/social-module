class TempPostCacher {
    postMap = new Map();
    cache(post) {
        this.postMap.set(post.id, post);
    }
    get(postId) {
        return this.postMap.get(postId);
    }
}
export default new TempPostCacher();
//# sourceMappingURL=TempPostCacher.js.map