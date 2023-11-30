import { Store } from "common-app-module";
import { DomChild } from "common-app-module/lib/dom/DomNode.js";
import SoFiComponent from "../SoFiComponent.js";
export interface NotificationListOptions {
    userId: string;
    tableName: string;
    storeName: string;
    emptyMessage: string;
}
export default abstract class NotificationList<T> extends SoFiComponent {
    protected store: Store;
    private channel;
    constructor(tag: string, options: NotificationListOptions, initialLoadingAnimation: DomChild);
    protected abstract addNotificationItem(notification: T, isNew: boolean): void;
    protected abstract fetchNotification(id: number): Promise<T | undefined>;
    protected abstract fetchNotifications(): Promise<T[]>;
    private refresh;
    delete(): void;
}
//# sourceMappingURL=NotificationList.d.ts.map