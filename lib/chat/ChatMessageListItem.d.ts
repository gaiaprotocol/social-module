import SoFiComponent from "../SoFiComponent.js";
import Message from "../database-interface/Message.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
export default class ChatMessageListItem extends SoFiComponent {
    private messages;
    private options;
    private interactions;
    firstMessage: Message | undefined;
    private main;
    constructor(messages: Message[], options: {
        signedUserId?: string;
    }, interactions: ChatMessageInteractions);
    private goAuthorProfile;
    addMessage(message: Message, wait?: boolean): void;
}
//# sourceMappingURL=ChatMessageListItem.d.ts.map