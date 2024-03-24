import { EventContainer, Supabase } from "@common-module/app";
import SocialUserPublic from "../database-interface/SocialUserPublic.js";
import FCM from "../fcm/FCM.js";
import FCMTopicSubscribeManager from "../fcm/FCMTopicSubscribeManager.js";
import FollowService from "../follow/FollowService.js";

export default abstract class SignedUserManager<UT extends SocialUserPublic>
  extends EventContainer {
  public user: UT | undefined;

  public get signed() {
    return this.user !== undefined;
  }

  constructor() {
    super();
    this.addAllowedEvents("walletLinked");
  }

  public async init(
    fetchTopics: boolean,
    fetchFollows: boolean,
    initializers?: Promise<void>[],
  ) {
    const { data, error } = await Supabase.client.auth.getSession();
    if (error) throw error;
    const sessionUser = data?.session?.user;
    if (sessionUser) {
      [this.user] = await Promise.all([
        this.fetchUser(sessionUser.id),
        fetchTopics
          ? FCMTopicSubscribeManager.loadSignedUserSubscribedTopics(
            sessionUser.id,
          )
          : undefined,
        fetchFollows
          ? FollowService.fetchSignedUserFollows(sessionUser.id)
          : undefined,
        ...(initializers ?? []),
      ]);
      FCM.requestPermissionAndSaveToken();

      const request = indexedDB.open("signedUserIdDatabase");
      request.onupgradeneeded = (event) => {
        const db = (event.target as any)?.result;
        if (!db.objectStoreNames.contains("userIds")) {
          db.createObjectStore("userIds", { keyPath: "id" });
        }
      };
      request.onsuccess = () => {
        this.saveSignedUserIdToIndexedDB(sessionUser.id, request.result);
      };
      request.onerror = (event) => {
        console.error("Database error: ", (event.target as any)?.error);
      };
    }
  }

  private saveSignedUserIdToIndexedDB(signedUserId: string, db: IDBDatabase) {
    const transaction = db.transaction(["userIds"], "readwrite");
    const store = transaction.objectStore("userIds");
    const request = store.put({ id: "signedUserId", signedUserId });
    request.onsuccess = () => {
      console.log("Item added to the database", signedUserId);
    };
    request.onerror = (event) => {
      console.error("Database error: ", (event.target as any)?.error);
    };
  }

  protected abstract fetchUser(
    userId: string,
  ): Promise<UT | undefined>;

  public async signOut() {
    await Supabase.signOut();
    location.reload();
  }

  public async deleteAccount() {
    const { error } = await Supabase.client.functions.invoke("delete-account");
    if (error) throw error;
    this.signOut();
  }
}
