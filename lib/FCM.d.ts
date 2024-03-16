import { EventContainer } from "@common-module/app";
import { FirebaseOptions } from "firebase/app";
declare class FCM extends EventContainer {
    private vapidKey;
    private app;
    private messaging;
    init(options: FirebaseOptions, vapidKey: string): void;
    requestNotificationPermission(): Promise<NotificationPermission>;
    getToken(): Promise<string>;
    saveToken(): Promise<string>;
    requestPermissionAndSaveToken(): Promise<string | undefined>;
}
declare const _default: FCM;
export default _default;
//# sourceMappingURL=FCM.d.ts.map