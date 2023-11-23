import { DateUtil, el } from "common-app-module";
import SoFiComponent from "../SoFiComponent.js";
import Message from "../database-interface/Message.js";
import ChatMessageDisplay from "./ChatMessageDisplay.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";

export default class ChatMessageListItem extends SoFiComponent {
  constructor(private messages: Message[], options: {
    newMessageIds: number[];
    signedUserId?: string;
  }, private interactions: ChatMessageInteractions) {
    super(".chat-message-list-item");
    const message = messages[0];
    if (message) {
      const authorProfileImage = el(".author-profile-image", {
        style: {
          backgroundImage: `url(${message.author.profile_image_thumbnail})`,
        },
        click: (event) => this.goAuthorProfile(event),
      });

      const authorInfoDisplay = el(
        ".author",
        el(".name", message.author.display_name, {
          click: (event) => this.goAuthorProfile(event),
        }),
      );

      const dateDisplay = el(".date", DateUtil.fromNow(message.created_at));

      const messageDisplays = messages.map((message) =>
        new ChatMessageDisplay(message, {
          owner: options.signedUserId !== undefined &&
            message.author.user_id === options.signedUserId,
          new: options.newMessageIds.includes(message.id),
        }, interactions)
      );

      if (message.author.user_id === options.signedUserId) {
        this.append(
          el(
            "main",
            el("header", dateDisplay, authorInfoDisplay),
            ...messageDisplays,
          ),
          authorProfileImage,
        ).addClass("authored");
      } else {
        this.append(
          authorProfileImage,
          el(
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
}
