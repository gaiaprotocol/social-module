import { EventContainer } from "@common-module/app";
import { FirebaseOptions } from "firebase/app";
declare class FCM extends EventContainer {
    private vapidKey;
    private app;
    private messaging;
    init(options: FirebaseOptions, vapidKey: string): void;
    requestPermissionAndSaveToken(): Promise<boolean>;
    closeAllNotifications(tag: string): Promise<void>;
}
declare const _default: FCM;
export default _default;
//# sourceMappingURL=FCM.d.ts.map