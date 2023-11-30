import { Store } from "common-app-module";
import SoFiComponent from "../SoFiComponent.js";
export interface NotificationListOptions {
    storeName: string;
    emptyMessage: string;
}
export default abstract class NotificationList extends SoFiComponent {
    protected store: Store;
    constructor(tag: string, options: NotificationListOptions);
}
//# sourceMappingURL=NotificationList.d.ts.map