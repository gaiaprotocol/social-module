import ChatMessageList from "../chat/ChatMessageList.js";
import Message from "../database-interface/Message.js";
export default class TestChatMessageList extends ChatMessageList {
    constructor();
    protected fetchMessages(): Promise<Message[]>;
}
//# sourceMappingURL=TestChatMessageList.d.ts.map