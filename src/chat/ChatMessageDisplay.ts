import { el, RichDisplay } from "common-app-module";
import Message from "../database-interface/Message.js";
import SoFiComponent from "../SoFiComponent.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";

// Displays a single message.
export default class ChatMessageDisplay extends SoFiComponent {
  private richDisplay: RichDisplay | undefined;

  constructor(message: Message, options: {
    owner: boolean;
  }, interactions: ChatMessageInteractions) {
    super(".chat-message-display");
    this.addAllowedEvents("imageLoaded");

    this.append(
      el("p.message", message.message),
      message.rich
        ? this.richDisplay = new RichDisplay(message.rich)
        : undefined,
    );

    this.richDisplay?.on(
      "imageLoaded",
      (imageHeight) => this.fireEvent("imageLoaded", imageHeight),
    );
  }
}
