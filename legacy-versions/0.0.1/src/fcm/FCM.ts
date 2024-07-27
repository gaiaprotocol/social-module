import { EventContainer, Supabase } from "@common-module/app";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import { getMessaging, getToken, Messaging } from "firebase/messaging";

class FCM extends EventContainer {
  private vapidKey!: string;
  private app!: FirebaseApp;
  private messaging!: Messaging;

  public init(options: FirebaseOptions, vapidKey: string) {
    this.app = initializeApp(options);
    this.messaging = getMessaging(this.app);
    this.vapidKey = vapidKey;
  }

  public async requestPermissionAndSaveToken() {
    const permission = Notification.permission === "granted"
      ? "granted"
      : await (() => {
        return new Promise<NotificationPermission>((resolve) => {
          Notification.requestPermission((permission) => resolve(permission));
        });
      })();

    if (permission === "granted") {
      const fcmToken = await getToken(this.messaging, {
        vapidKey: this.vapidKey,
      });
      const { error } = await Supabase.client.functions.invoke(
        "store-fcm-token",
        { body: { fcmToken } },
      );
      if (error) throw error;

      return true;
    }

    return false;
  }

  public async closeAllNotifications(tag: string) {
    const registration = await navigator.serviceWorker.getRegistration(
      "/firebase-cloud-messaging-push-scope",
    );
    if (registration) {
      const notifications = await registration.getNotifications({ tag });
      for (const notification of notifications) {
        notification.close();
      }
    }
  }
}

export default new FCM();
