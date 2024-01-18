import Notification from "../database-interface/Notification.js";
import SocialComponent from "../SocialComponent.js";
export default abstract class NotificationListItem<T> extends SocialComponent {
    constructor(tag: string, notification: Notification<T>);
}
//# sourceMappingURL=NotificationListItem.d.ts.map