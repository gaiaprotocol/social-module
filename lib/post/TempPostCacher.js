export default class TempPostCacher {
    postMap = new Map();
    cache(mainPostId, data) {
        this.postMap.set(mainPostId, data);
    }
    get(mainPostId) {
        return this.postMap.get(mainPostId);
    }
}
//# sourceMappingURL=TempPostCacher.js.map