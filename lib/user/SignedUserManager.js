import { EventContainer, Supabase } from "common-app-module";
import FollowService from "../follow/FollowService.js";
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
            [this.user] = await Promise.all([
                this.fetchUser(sessionUser.id),
                FollowService.fetchSignedUserFollows(sessionUser.id),
            ]);
        }
    }
    async signOut() {
        await Supabase.signOut();
        location.reload();
    }
}
//# sourceMappingURL=SignedUserManager.js.map