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
    async init(fetchTopics, fetchFollows) {
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
            ]);
            FCM.requestPermissionAndSaveToken();
        }
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