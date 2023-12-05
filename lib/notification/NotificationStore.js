import { SupabaseService } from "common-app-module";
export default class NotificationStore extends SupabaseService {
    async fetchNotification(id) {
        return await this.safeSelectSingle((b) => b.eq("id", id));
    }
    async fetchNotifications(userId) {
        return await this.safeSelect((b) => b.eq("user_id", userId).order("created_at", { ascending: false }));
    }
}
//# sourceMappingURL=NotificationStore.js.map