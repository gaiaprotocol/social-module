import { EventContainer } from "@common-module/app";
declare class FCMTopicSubscribeManager extends EventContainer {
    private subscribedTopics;
    constructor();
    loadSignedUserSubscribedTopics(userId: string): Promise<void>;
    subscribe(topic: string): Promise<void>;
    unsubscribe(topic: string): Promise<void>;
    isSubscribed(topic: string): boolean;
}
declare const _default: FCMTopicSubscribeManager;
export default _default;
//# sourceMappingURL=FCMTopicSubscribeManager.d.ts.map