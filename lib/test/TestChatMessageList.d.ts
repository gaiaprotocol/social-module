import ChatMessageList from "../chat/ChatMessageList.js";
import ChatMessage from "../database-interface/ChatMessage.js";
export default class TestChatMessageList extends ChatMessageList<number> {
    constructor();
    protected fetchMessages(): Promise<ChatMessage<number>[]>;
}
//# sourceMappingURL=TestChatMessageList.d.ts.map