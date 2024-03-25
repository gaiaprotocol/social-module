import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

const firebaseApp = initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
});

self.addEventListener("notificationclick", (event: any) => {
  console.log("On notification click: ", event.notification);
  event.notification.close();

  event.waitUntil(
    (self as any).clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList: any) => {
        for (const client of clientList) {
          console.log(client);
          if ("focus" in client) {
            client.postMessage({
              action: "notificationclick",
              data: event.notification.data,
            });
            return client.focus();
          }
        }
        if ((self as any).clients.openWindow) {
          const fcmData = event.notification.data?.FCM_MSG?.data;
          return (self as any).clients.openWindow(fcmData.redirectTo ?? "/");
        }
      }),
  );
});

getMessaging(firebaseApp);

console.log("Firebase messaging service worker loaded");
