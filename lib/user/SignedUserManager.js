import { EventContainer, Store, Supabase } from "@common-module/app";
import FCM from "../fcm/FCM.js";
export default class SignedUserManager extends EventContainer {
    store = new Store("__SIGN_USER_MANAGER_STORE");
    user;
    get signed() {
        return this.user !== undefined;
    }
    async fetchSessionUser(cachedSessionUserId) {
        const { data, error } = await Supabase.client.auth.getSession();
        if (error)
            throw error;
        const sessionUserId = data?.session?.user.id;
        if (cachedSessionUserId !== undefined && sessionUserId !== cachedSessionUserId)
            window.location.reload();
        if (sessionUserId) {
            this.store.set("sessionUserId", sessionUserId, true);
        }
        else {
            this.store.delete("sessionUserId");
        }
        return sessionUserId;
    }
    async init(additionalInitializers) {
        let sessionUserId = this.store.get("sessionUserId");
        if (!sessionUserId) {
            sessionUserId = await this.fetchSessionUser(sessionUserId);
        }
        else
            this.fetchSessionUser(sessionUserId);
        if (sessionUserId) {
            await Promise.all([
                this.fetchUser(sessionUserId),
                ...(additionalInitializers?.map((initializer) => initializer(sessionUserId)) ?? []),
            ]);
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