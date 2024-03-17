import { SupabaseService } from "@common-module/app";
class FCMTokenService extends SupabaseService {
    constructor() {
        super("fcm_tokens", "user_id, subscribed_topics", 100);
    }
    async fetch(userId, token) {
        return await this.safeSelectSingle((b) => b.eq("user_id", userId).eq("token", token));
    }
}
export default new FCMTokenService();
//# sourceMappingURL=FCMTokenService.js.map