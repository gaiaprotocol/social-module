import { Store } from "common-app-module";
import SoFiComponent from "../SoFiComponent.js";

export interface NotificationListOptions {
  storeName: string;
  emptyMessage: string;
}

export default abstract class NotificationList extends SoFiComponent {
  protected store: Store;

  constructor(tag: string, options: NotificationListOptions) {
    super(tag + ".notification-list");
    this.store = new Store(options.storeName);
    this.domElement.setAttribute("data-empty-message", options.emptyMessage);
  }
}
