import { ListLoadingBar, Store, Supabase } from "@common-module/app";
import SoFiComponent from "../SoFiComponent.js";
export default class NotificationList extends SoFiComponent {
    store;
    channel;
    constructor(tag, options, initialLoadingAnimation) {
        super(tag + ".notification-list");
        this.store = new Store(options.storeName);
        this.domElement.setAttribute("data-empty-message", options.emptyMessage);
        const cachedNotifications = this.store.get("cached-notifications");
        if (cachedNotifications && cachedNotifications.length > 0) {
            for (const notification of cachedNotifications) {
                this.addNotificationItem(notification, false);
            }
        }
        else {
            this.append(initialLoadingAnimation);
        }
        setTimeout(() => this.refresh());
        this.channel = Supabase.client
            .channel(`${options.tableName}-changes`)
            .on("postgres_changes", {
            event: "INSERT",
            schema: "public",
            table: options.tableName,
            filter: "user_id=eq." + options.userId,
        }, async (payload) => {
            const notification = await this.fetchNotification(payload.new.id);
            if (notification) {
                const cachedNotifications = this.store.get("cached-notifications") ?? [];
                cachedNotifications.push(notification);
                this.store.set("cached-notifications", cachedNotifications, true);
                this.addNotificationItem(notification, true);
            }
        })
            .subscribe();
    }
    async refresh() {
        this.append(new ListLoadingBar());
        const notifications = await this.fetchNotifications();
        this.store.set("cached-notifications", notifications, true);
        if (!this.deleted) {
            this.empty();
            for (const notification of notifications) {
                this.addNotificationItem(notification, false);
            }
        }
    }
    delete() {
        this.channel.unsubscribe();
        super.delete();
    }
}
//# sourceMappingURL=NotificationList.js.map