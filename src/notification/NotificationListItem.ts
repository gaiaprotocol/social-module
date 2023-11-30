import { el, Router } from "common-app-module";
import Notification from "../database-interface/Notification.js";
import SoFiComponent from "../SoFiComponent.js";

export default abstract class NotificationListItem<T> extends SoFiComponent {
  constructor(tag: string, notification: Notification<T>) {
    super(tag + ".notification-list-item");

    this.append(el(".triggerer-profile-image", {
      style: {
        backgroundImage: `url(${notification.triggerer.profile_image})`,
      },
      click: (event) => {
        event.stopPropagation();
        Router.go(`/${notification.triggerer.x_username}`);
      },
    }));
  }
}
