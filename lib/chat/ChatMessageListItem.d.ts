import SocialComponent from "../SocialComponent.js";
import ChatMessage from "../database-interface/ChatMessage.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
export default class ChatMessageListItem<S> extends SocialComponent {
    private messages;
    private options;
    private interactions;
    firstMessage: ChatMessage<S> | undefined;
    private main;
    constructor(messages: ChatMessage<S>[], options: {
        signedUserId?: string;
    }, interactions: ChatMessageInteractions<S>);
    private goAuthorProfile;
    private createDisplay;
    addMessage(message: ChatMessage<S>, wait?: boolean): void;
}
//# sourceMappingURL=ChatMessageListItem.d.ts.map