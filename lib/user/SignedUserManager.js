import { EventContainer, Supabase } from "common-app-module";
export default class SignedUserManager extends EventContainer {
    user;
    get signed() {
        return this.user !== undefined;
    }
    get walletLinked() {
        return this.user?.wallet_address !== undefined;
    }
    constructor() {
        super();
        this.addAllowedEvents("walletLinked");
    }
    async fetchUserOnInit() {
        const { data, error } = await Supabase.client.auth.getSession();
        if (error)
            throw error;
        const sessionUser = data?.session?.user;
        if (sessionUser) {
            this.user = await this.fetchUser(sessionUser.id);
        }
    }
    async signOut() {
        await Supabase.signOut();
        location.reload();
    }
}
//# sourceMappingURL=SignedUserManager.js.map