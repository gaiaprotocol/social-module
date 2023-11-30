import Notification from "../database-interface/Notification.js";
import SoFiComponent from "../SoFiComponent.js";
export default abstract class NotificationListItem<T> extends SoFiComponent {
    constructor(tag: string, notification: Notification<T>);
}
//# sourceMappingURL=NotificationListItem.d.ts.map