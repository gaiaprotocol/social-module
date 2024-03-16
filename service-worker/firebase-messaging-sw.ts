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

getMessaging(firebaseApp);
