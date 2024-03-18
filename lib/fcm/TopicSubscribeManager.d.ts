declare class TopicSubscribeManager {
    private subscribedTopics;
    loadSignedUserSubscribedTopics(userId: string): Promise<void>;
    subscribe(userId: string, topic: string): Promise<void>;
}
declare const _default: TopicSubscribeManager;
export default _default;
//# sourceMappingURL=TopicSubscribeManager.d.ts.map