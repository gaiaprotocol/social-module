import { ListLoadingBar, Store, Supabase } from "common-app-module";
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
                this.addNotificationItem(notification);
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
        }, (payload) => {
            console.log(payload);
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
                this.addNotificationItem(notification);
            }
        }
    }
    delete() {
        this.channel.unsubscribe();
        super.delete();
    }
}
//# sourceMappingURL=NotificationList.js.map