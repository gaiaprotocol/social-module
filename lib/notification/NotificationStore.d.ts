import { SupabaseService } from "common-app-module";
export default class NotificationStore<T> extends SupabaseService {
    fetchNotifications(userId: string): Promise<T[]>;
}
//# sourceMappingURL=NotificationStore.d.ts.map