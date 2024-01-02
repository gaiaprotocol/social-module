import { SupabaseService } from "@common-module/app";
export default class NotificationStore<T> extends SupabaseService<T> {
    fetchNotification(id: number): Promise<T | undefined>;
    fetchNotifications(userId: string): Promise<T[]>;
}
//# sourceMappingURL=NotificationStore.d.ts.map