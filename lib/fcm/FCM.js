import { EventContainer, Supabase } from "@common-module/app";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
class FCM extends EventContainer {
    vapidKey;
    app;
    messaging;
    init(options, vapidKey) {
        this.app = initializeApp(options);
        this.messaging = getMessaging(this.app);
        this.vapidKey = vapidKey;
    }
    async requestPermissionAndSaveToken() {
        const permission = await (() => {
            return new Promise((resolve) => {
                Notification.requestPermission((permission) => resolve(permission));
            });
        })();
        if (permission === "granted") {
            const fcmToken = await getToken(this.messaging, {
                vapidKey: this.vapidKey,
            });
            const { error } = await Supabase.client.functions.invoke("store-fcm-token", { body: { fcmToken } });
            if (error)
                throw error;
        }
    }
}
export default new FCM();
//# sourceMappingURL=FCM.js.map