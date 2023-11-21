import SoFiComponent from "../SoFiComponent.js";
import Message from "../database-interface/Message.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
export default class ChatMessageListItem extends SoFiComponent {
    private messages;
    private interactions;
    constructor(messages: Message[], options: {
        newMessageIds: number[];
        signedUserId?: string;
    }, interactions: ChatMessageInteractions);
    private goAuthorProfile;
}
//# sourceMappingURL=ChatMessageListItem.d.ts.map