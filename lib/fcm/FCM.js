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
    async requestNotificationPermission() {
        return await (() => {
            return new Promise((resolve) => {
                Notification.requestPermission((permission) => resolve(permission));
            });
        })();
    }
    async getToken() {
        return await getToken(this.messaging, { vapidKey: this.vapidKey });
    }
    async saveToken() {
        const token = await this.getToken();
        const { error } = await Supabase.client.functions.invoke("store-fcm-token", { body: { fcmToken: token } });
        if (error)
            throw error;
        return token;
    }
    async requestPermissionAndSaveToken() {
        const permission = await this.requestNotificationPermission();
        if (permission === "granted") {
            return await this.saveToken();
        }
    }
}
export default new FCM();
//# sourceMappingURL=FCM.js.map