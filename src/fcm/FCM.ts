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

  public async requestNotificationPermission() {
    return await (() => {
      return new Promise<NotificationPermission>((resolve) => {
        Notification.requestPermission((permission) => resolve(permission));
      });
    })();
  }

  public async getToken() {
    return await getToken(this.messaging, { vapidKey: this.vapidKey });
  }

  public async saveToken() {
    const token = await this.getToken();
    const { error } = await Supabase.client.functions.invoke(
      "store-fcm-token",
      { body: { fcmToken: token } },
    );
    if (error) throw error;
    return token;
  }

  public async requestPermissionAndSaveToken() {
    const permission = await this.requestNotificationPermission();
    if (permission === "granted") {
      return await this.saveToken();
    }
  }
}

export default new FCM();
