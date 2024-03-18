import FCMTokenService from "./FCMTokenService.js";
class TopicSubscribeManager {
    subscribedTopics = new Set();
    async loadSignedUserSubscribedTopics(userId) {
        const tokens = await FCMTokenService.fetchUserTokens(userId);
        for (const token of tokens) {
            for (const topic of token.subscribed_topics) {
                this.subscribedTopics.add(topic);
            }
        }
    }
}
export default new TopicSubscribeManager();
//# sourceMappingURL=SubscribedTopicManager.js.map