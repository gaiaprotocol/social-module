import { Store } from "common-app-module";
import SoFiComponent from "../SoFiComponent.js";
export default class NotificationList extends SoFiComponent {
    store;
    constructor(tag, options) {
        super(tag + ".notification-list");
        this.store = new Store(options.storeName);
        this.domElement.setAttribute("data-empty-message", options.emptyMessage);
    }
}
//# sourceMappingURL=NotificationList.js.map