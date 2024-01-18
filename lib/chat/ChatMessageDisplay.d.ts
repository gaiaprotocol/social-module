import ChatMessage from "../database-interface/ChatMessage.js";
import SocialComponent from "../SocialComponent.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
export default class ChatMessageDisplay<S> extends SocialComponent {
    private richDisplay;
    constructor(message: ChatMessage<S>, options: {
        owner: boolean;
    }, interactions: ChatMessageInteractions<S>);
}
//# sourceMappingURL=ChatMessageDisplay.d.ts.map