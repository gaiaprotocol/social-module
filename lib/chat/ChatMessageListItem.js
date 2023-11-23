import { DateUtil, el } from "common-app-module";
import SoFiComponent from "../SoFiComponent.js";
import ChatMessageDisplay from "./ChatMessageDisplay.js";
export default class ChatMessageListItem extends SoFiComponent {
    messages;
    interactions;
    constructor(messages, options, interactions) {
        super(".chat-message-list-item");
        this.messages = messages;
        this.interactions = interactions;
        const message = messages[0];
        if (message) {
            const authorProfileImage = el(".author-profile-image", {
                style: {
                    backgroundImage: `url(${message.author.profile_image_thumbnail})`,
                },
                click: (event) => this.goAuthorProfile(event),
            });
            const authorInfoDisplay = el(".author", el(".name", message.author.display_name, {
                click: (event) => this.goAuthorProfile(event),
            }));
            const dateDisplay = el(".date", DateUtil.fromNow(message.created_at));
            const messageDisplays = messages.map((message) => new ChatMessageDisplay(message, {
                owner: options.signedUserId !== undefined &&
                    message.author.user_id === options.signedUserId,
                new: options.newMessageIds.includes(message.id),
            }, interactions));
            if (message.author.user_id === options.signedUserId) {
                this.append(el("main", el("header", dateDisplay, authorInfoDisplay), ...messageDisplays), authorProfileImage).addClass("authored");
            }
            else {
                this.append(authorProfileImage, el("main", el("header", authorInfoDisplay, dateDisplay), ...messageDisplays));
            }
        }
    }
    goAuthorProfile(event) {
        event.stopPropagation();
        const message = this.messages[0];
        if (message)
            this.interactions.openAuthorProfile(message.author);
    }
}
//# sourceMappingURL=ChatMessageListItem.js.map