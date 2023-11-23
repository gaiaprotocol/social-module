import ChatMessageList from "../chat/ChatMessageList.js";
class TestChatMessageInteractions {
    openAuthorProfile(author) {
        throw new Error("Method not implemented.");
    }
}
export default class TestChatMessageList extends ChatMessageList {
    constructor() {
        super(".test-chat-message-list", {
            storeName: "global-posts",
            emptyMessage: "No posts yet. Be the first to post!",
        }, new TestChatMessageInteractions(), "Loading...");
    }
    fetchMessages() {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=TestChatMessageList.js.map