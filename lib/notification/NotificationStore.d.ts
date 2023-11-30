import { SupabaseService } from "common-app-module";
export default class NotificationStore<T> extends SupabaseService {
    fetchNotification(id: number): Promise<T | undefined>;
    fetchNotifications(userId: string): Promise<T[]>;
}
//# sourceMappingURL=NotificationStore.d.ts.map