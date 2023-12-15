import SoFiComponent from "../SoFiComponent.js";
import ChatMessage from "../database-interface/ChatMessage.js";
import ChatMessageDisplay from "./ChatMessageDisplay.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
export default class ChatMessageListItem<S> extends SoFiComponent {
    private messages;
    private options;
    private interactions;
    firstMessage: ChatMessage<S> | undefined;
    private main;
    constructor(messages: ChatMessage<S>[], options: {
        signedUserId?: string;
    }, interactions: ChatMessageInteractions<S>);
    private goAuthorProfile;
    createDisplay(message: ChatMessage<S>): ChatMessageDisplay<S>;
    addMessage(message: ChatMessage<S>, wait?: boolean): void;
}
//# sourceMappingURL=ChatMessageListItem.d.ts.map