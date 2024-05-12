import { EventContainer, Store, Supabase } from "@common-module/app";
import FCM from "../fcm/FCM.js";
export default class SignedUserManager extends EventContainer {
    store = new Store("__SIGN_USER_MANAGER_STORE");
    sessionUserId;
    user;
    get signed() {
        return this.user !== undefined;
    }
    async fetchSessionUser() {
        const cachedSessionUserId = this.sessionUserId;
        const { data, error } = await Supabase.client.auth.getSession();
        if (error)
            throw error;
        this.sessionUserId = data?.session?.user.id;
        if (cachedSessionUserId !== undefined &&
            this.sessionUserId !== cachedSessionUserId) {
            this.store.delete("sessionUserId", "user");
            window.location.reload();
        }
        else if (this.sessionUserId) {
            this.store.set("sessionUserId", this.sessionUserId, true);
        }
        else {
            this.store.delete("sessionUserId", "user");
        }
    }
    async init() {
        this.sessionUserId = this.store.get("sessionUserId");
        if (!this.sessionUserId)
            await this.fetchSessionUser();
        else
            this.fetchSessionUser();
        if (this.sessionUserId) {
            await this.fetchUser();
            FCM.requestPermissionAndSaveToken();
        }
    }
    async signOut() {
        this.store.delete("sessionUserId", "user");
        try {
            await Supabase.signOut();
        }
        catch (error) {
            console.error(error);
        }
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