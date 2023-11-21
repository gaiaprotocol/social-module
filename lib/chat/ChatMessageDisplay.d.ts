import Message from "../database-interface/Message.js";
import SoFiComponent from "../SoFiComponent.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
export default class ChatMessageDisplay extends SoFiComponent {
    constructor(message: Message, options: {
        owner: boolean;
        new: boolean;
    }, interactions: ChatMessageInteractions);
}
//# sourceMappingURL=ChatMessageDisplay.d.ts.map