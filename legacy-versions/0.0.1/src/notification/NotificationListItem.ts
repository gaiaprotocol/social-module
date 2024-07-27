import { el, Router } from "@common-module/app";
import Notification from "../database-interface/Notification.js";
import SocialComponent from "../SocialComponent.js";

export default abstract class NotificationListItem<T> extends SocialComponent {
  constructor(tag: string, notification: Notification<T>) {
    super(tag + ".notification-list-item");

    if (notification.triggerer) {
      this.append(el(".triggerer-avatar", {
        style: {
          backgroundImage: `url(${notification.triggerer.avatar})`,
        },
        click: (event) => {
          event.stopPropagation();
          Router.go(`/${notification.triggerer!.x_username}`);
        },
      }));
    }
  }
}
