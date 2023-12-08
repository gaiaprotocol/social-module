import { DateUtil, DomNode, el } from "common-app-module";
import SoFiComponent from "../SoFiComponent.js";
import Message from "../database-interface/Message.js";
import ChatMessageDisplay from "./ChatMessageDisplay.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";

export default class ChatMessageListItem extends SoFiComponent {
  public firstMessage: Message | undefined;
  private main: DomNode | undefined;

  constructor(
    private messages: Message[],
    private options: { signedUserId?: string },
    private interactions: ChatMessageInteractions,
  ) {
    super(".chat-message-list-item");
    this.firstMessage = messages[0];
    if (this.firstMessage) {
      const authorProfileImage = el(".author-profile-image", {
        style: {
          backgroundImage:
            `url(${this.firstMessage.author.profile_image_thumbnail})`,
        },
        click: (event) => this.goAuthorProfile(event),
      });

      const authorInfoDisplay = el(
        ".author",
        el(".name", this.firstMessage.author.display_name, {
          click: (event) => this.goAuthorProfile(event),
        }),
      );

      const dateDisplay = el(
        ".date",
        DateUtil.fromNow(this.firstMessage.created_at),
      );

      const messageDisplays = messages.map((message) =>
        new ChatMessageDisplay(message, {
          owner: options.signedUserId !== undefined &&
            message.author.user_id === options.signedUserId,
        }, interactions)
      );

      if (this.firstMessage.author.user_id === options.signedUserId) {
        this.append(
          this.main = el(
            "main",
            el("header", dateDisplay, authorInfoDisplay),
            ...messageDisplays,
          ),
          authorProfileImage,
        ).addClass("authored");
      } else {
        this.append(
          authorProfileImage,
          this.main = el(
            "main",
            el("header", authorInfoDisplay, dateDisplay),
            ...messageDisplays,
          ),
        );
      }
    }
  }

  private goAuthorProfile(event: MouseEvent) {
    event.stopPropagation();
    const message = this.messages[0];
    if (message) this.interactions.openAuthorProfile(message.author);
  }

  public addMessage(message: Message, wait?: boolean) {
    if (this.main) {
      const display = new ChatMessageDisplay(message, {
        owner: this.options.signedUserId !== undefined &&
          message.author.user_id === this.options.signedUserId,
      }, this.interactions).appendTo(this.main);
      display.addClass("new");
      if (wait) display.addClass("wait");
    }
  }
}
