import { EventContainer, Store, Supabase } from "@common-module/app";
import SocialUserPublic from "../database-interface/SocialUserPublic.js";
import FCM from "../fcm/FCM.js";

export default abstract class SignedUserManager<UT extends SocialUserPublic>
  extends EventContainer {
  protected store = new Store("__SIGN_USER_MANAGER_STORE");

  public user: UT | undefined;

  public get signed() {
    return this.user !== undefined;
  }

  private async fetchSessionUser(cachedSessionUserId: string | undefined) {
    const { data, error } = await Supabase.client.auth.getSession();
    if (error) throw error;
    const sessionUserId = data?.session?.user.id;
    if (
      cachedSessionUserId !== undefined && sessionUserId !== cachedSessionUserId
    ) window.location.reload();
    this.store.set("sessionUserId", sessionUserId, true);
    return sessionUserId;
  }

  public async init(
    additionalInitializers?: ((userId: string) => Promise<void> | void)[],
  ) {
    let sessionUserId = this.store.get<string>("sessionUserId");
    if (!sessionUserId) {
      sessionUserId = await this.fetchSessionUser(sessionUserId);
    }
    if (sessionUserId) {
      await Promise.all([
        this.fetchUser(sessionUserId),
        ...(additionalInitializers?.map((initializer) =>
          initializer(sessionUserId)
        ) ?? []),
      ]);
      FCM.requestPermissionAndSaveToken();
    }
  }

  protected abstract fetchUser(userId: string): Promise<void>;

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
