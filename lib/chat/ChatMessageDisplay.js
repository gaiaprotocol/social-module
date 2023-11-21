import { el, RichDisplay } from "common-app-module";
import SoFiComponent from "../SoFiComponent.js";
export default class ChatMessageDisplay extends SoFiComponent {
    constructor(message, options, interactions) {
        super(".chat-message-display");
        this.append(el(".message", message.message), message.rich ? new RichDisplay(message.rich) : undefined);
    }
}
//# sourceMappingURL=ChatMessageDisplay.js.map