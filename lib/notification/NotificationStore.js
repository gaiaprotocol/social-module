import { SupabaseService } from "common-app-module";
export default class NotificationStore extends SupabaseService {
    async fetchNotification(id) {
        const data = await this.safeFetch((b) => b.select(this.selectQuery).eq("id", id));
        return data?.[0];
    }
    async fetchNotifications(userId) {
        const data = await this.safeFetch((b) => b.select(this.selectQuery).limit(this.fetchLimit).eq("user_id", userId).order("created_at", { ascending: false }));
        return data ?? [];
    }
}
//# sourceMappingURL=NotificationStore.js.map