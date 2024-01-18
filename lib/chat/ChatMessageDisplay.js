import { el, RichDisplay } from "@common-module/app";
import SocialComponent from "../SocialComponent.js";
export default class ChatMessageDisplay extends SocialComponent {
    richDisplay;
    constructor(message, options, interactions) {
        super(".chat-message-display");
        this.addAllowedEvents("imageLoaded");
        this.append(el("p.message", message.message), message.rich
            ? this.richDisplay = new RichDisplay(message.rich)
            : undefined);
        this.richDisplay?.on("imageLoaded", (imageHeight) => this.fireEvent("imageLoaded", imageHeight));
    }
}
//# sourceMappingURL=ChatMessageDisplay.js.map