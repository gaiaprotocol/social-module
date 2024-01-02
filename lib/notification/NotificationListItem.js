import { el, Router } from "@common-module/app";
import SoFiComponent from "../SoFiComponent.js";
export default class NotificationListItem extends SoFiComponent {
    constructor(tag, notification) {
        super(tag + ".notification-list-item");
        if (notification.triggerer) {
            this.append(el(".triggerer-profile-image", {
                style: {
                    backgroundImage: `url(${notification.triggerer.avatar})`,
                },
                click: (event) => {
                    event.stopPropagation();
                    Router.go(`/${notification.triggerer.x_username}`);
                },
            }));
        }
    }
}
//# sourceMappingURL=NotificationListItem.js.map