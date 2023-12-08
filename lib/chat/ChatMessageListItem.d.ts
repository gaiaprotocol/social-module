import SoFiComponent from "../SoFiComponent.js";
import Message from "../database-interface/Message.js";
import ChatMessageDisplay from "./ChatMessageDisplay.js";
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
    createDisplay(message: Message): ChatMessageDisplay;
    addMessage(message: Message, wait?: boolean): void;
}
//# sourceMappingURL=ChatMessageListItem.d.ts.map