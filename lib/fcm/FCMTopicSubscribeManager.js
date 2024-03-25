import { EventContainer, Supabase } from "@common-module/app";
import FCMSubscribedTopicService from "./FCMSubscribedTopicService.js";
class FCMTopicSubscribeManager extends EventContainer {
    subscribedTopics = new Set();
    constructor() {
        super();
        this.addAllowedEvents("subscribe", "unsubscribe");
    }
    async loadSignedUserSubscribedTopics(userId) {
        const all = await FCMSubscribedTopicService.fetchAll(userId);
        for (const data of all) {
            this.subscribedTopics.add(data.topic);
        }
    }
    async subscribe(topic) {
        this.subscribedTopics.add(topic);
        this.fireEvent("subscribe", topic);
        const { error } = await Supabase.client.functions.invoke("subscribe-fcm-topic", { body: { topic } });
        if (error)
            throw error;
    }
    async unsubscribe(topic) {
        this.subscribedTopics.delete(topic);
        this.fireEvent("unsubscribe", topic);
        const { error } = await Supabase.client.functions.invoke("unsubscribe-fcm-topic", { body: { topic } });
        if (error)
            throw error;
    }
    isSubscribed(topic) {
        return this.subscribedTopics.has(topic);
    }
}
export default new FCMTopicSubscribeManager();
//# sourceMappingURL=FCMTopicSubscribeManager.js.map