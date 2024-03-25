import { SupabaseService } from "@common-module/app";
class FCMSubscribedTopicService extends SupabaseService {
    constructor() {
        super("fcm_subscribed_topics", "topic", 100);
    }
    async fetchAll(userId) {
        return await this.safeSelect((b) => b.eq("user_id", userId), 1000);
    }
}
export default new FCMSubscribedTopicService();
//# sourceMappingURL=FCMSubscribedTopicService.js.map