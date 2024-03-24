import { EventContainer, Supabase } from "@common-module/app";
import FCM from "../fcm/FCM.js";
import FCMTopicSubscribeManager from "../fcm/FCMTopicSubscribeManager.js";
import FollowService from "../follow/FollowService.js";
export default class SignedUserManager extends EventContainer {
    user;
    get signed() {
        return this.user !== undefined;
    }
    constructor() {
        super();
        this.addAllowedEvents("walletLinked");
    }
    async init(fetchTopics, fetchFollows, initializers) {
        const { data, error } = await Supabase.client.auth.getSession();
        if (error)
            throw error;
        const sessionUser = data?.session?.user;
        if (sessionUser) {
            [this.user] = await Promise.all([
                this.fetchUser(sessionUser.id),
                fetchTopics
                    ? FCMTopicSubscribeManager.loadSignedUserSubscribedTopics(sessionUser.id)
                    : undefined,
                fetchFollows
                    ? FollowService.fetchSignedUserFollows(sessionUser.id)
                    : undefined,
                ...(initializers ?? []),
            ]);
            FCM.requestPermissionAndSaveToken();
            const request = indexedDB.open("signedUserIdDatabase");
            request.onupgradeneeded = (event) => {
                const db = event.target?.result;
                if (!db.objectStoreNames.contains("userIds")) {
                    db.createObjectStore("userIds", { keyPath: "id" });
                }
            };
            request.onsuccess = () => {
                this.saveSignedUserIdToIndexedDB(sessionUser.id, request.result);
            };
            request.onerror = (event) => {
                console.error("Database error: ", event.target?.error);
            };
        }
    }
    saveSignedUserIdToIndexedDB(signedUserId, db) {
        const transaction = db.transaction(["userIds"], "readwrite");
        const store = transaction.objectStore("userIds");
        const request = store.put({ id: "signedUserId", signedUserId });
        request.onsuccess = () => {
            console.log("Item added to the database", signedUserId);
        };
        request.onerror = (event) => {
            console.error("Database error: ", event.target?.error);
        };
    }
    async signOut() {
        await Supabase.signOut();
        location.reload();
    }
    async deleteAccount() {
        const { error } = await Supabase.client.functions.invoke("delete-account");
        if (error)
            throw error;
        this.signOut();
    }
}
//# sourceMappingURL=SignedUserManager.js.map