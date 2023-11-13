import { Supabase } from "common-app-module";
import MessageService from "../message/MessageService.js";
export default class PostService extends MessageService {
    repostTableName;
    likeTableName;
    constructor(postTableName, repostTableName, likeTableName, selectQuery, fetchLimit) {
        super(postTableName, selectQuery, fetchLimit);
        this.repostTableName = repostTableName;
        this.likeTableName = likeTableName;
        this.addAllowedEvents("newGlobalPost");
    }
    async fetchUserRepostedPosts(postIds, userId) {
        const data = await Supabase.safeFetch(this.repostTableName, (b) => b.select("post_id").in("post_id", postIds).eq("user_id", userId));
        return data ? data.map((d) => d.post_id) : [];
    }
    async fetchUserLikedPosts(postIds, userId) {
        const data = await Supabase.safeFetch(this.likeTableName, (b) => b.select("post_id").in("post_id", postIds).eq("user_id", userId));
        return data ? data.map((d) => d.post_id) : [];
    }
    notifyNewGlobalPost(post) {
        this.fireEvent("newGlobalPost", post);
    }
}
//# sourceMappingURL=PostService.js.map