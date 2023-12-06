import { SupabaseService } from "common-app-module";
export default class NotificationStore<T> extends SupabaseService<T> {
    fetchNotification(id: number): Promise<T>;
    fetchNotifications(userId: string): Promise<T[]>;
}
//# sourceMappingURL=NotificationStore.d.ts.map