import { EventContainer, Store, Supabase } from "@common-module/app";
import SocialUserPublic from "../database-interface/SocialUserPublic.js";
import FCM from "../fcm/FCM.js";

export default abstract class SignedUserManager<UT extends SocialUserPublic>
  extends EventContainer {
  protected store = new Store("__SIGN_USER_MANAGER_STORE");

  public sessionUserId: string | undefined;
  public user: UT | undefined;

  public get signed() {
    return this.user !== undefined;
  }

  private async fetchSessionUser() {
    const cachedSessionUserId = this.sessionUserId;
    const { data, error } = await Supabase.client.auth.getSession();
    if (error) throw error;
    this.sessionUserId = data?.session?.user.id;
    if (
      cachedSessionUserId !== undefined &&
      this.sessionUserId !== cachedSessionUserId
    ) {
      this.store.delete("sessionUserId", "user");
      window.location.reload();
    } else if (this.sessionUserId) {
      this.store.set("sessionUserId", this.sessionUserId, true);
    } else {
      this.store.delete("sessionUserId", "user");
    }
  }

  public async init() {
    this.sessionUserId = this.store.get<string>("sessionUserId");
    if (!this.sessionUserId) await this.fetchSessionUser();
    else this.fetchSessionUser(); // no await
    if (this.sessionUserId) {
      await this.fetchUser();
      FCM.requestPermissionAndSaveToken();
    }
  }

  protected abstract fetchUser(): Promise<void>;

  public async signOut() {
    this.store.delete("sessionUserId", "user");
    try {
      await Supabase.signOut();
    } catch (error) {
      console.error(error);
    }
    location.reload();
  }

  public async deleteAccount() {
    const { error } = await Supabase.client.functions.invoke("delete-account");
    if (error) throw error;
    this.signOut();
  }
}
