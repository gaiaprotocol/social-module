import { ListLoadingBar, Store } from "common-app-module";
import SoFiComponent from "../SoFiComponent.js";
import ChatMessageListItem from "./ChatMessageListItem.js";
export default class ChatMessageList extends SoFiComponent {
    options;
    interactions;
    store;
    constructor(tag, options, interactions, initialLoadingAnimation) {
        super(tag + ".chat-message-list");
        this.options = options;
        this.interactions = interactions;
        this.store = new Store(options.storeName);
        this.domElement.setAttribute("data-empty-message", options.emptyMessage);
        const cachedMessages = this.store.get("cached-messages");
        if (cachedMessages && cachedMessages.length > 0) {
            const groupedMessages = this.groupMessagesByAuthor(cachedMessages);
            for (const messages of groupedMessages) {
                this.append(new ChatMessageListItem(messages, {
                    newMessageIds: [],
                    signedUserId: options.signedUserId,
                }, interactions));
            }
        }
        else {
            this.append(initialLoadingAnimation);
        }
        this.refresh();
    }
    async refresh() {
        this.append(new ListLoadingBar());
        const messages = await this.fetchMessages();
        this.store.set("cached-messages", messages, true);
        if (!this.deleted) {
            this.empty();
            const groupedMessages = this.groupMessagesByAuthor(messages);
            for (const messages of groupedMessages) {
                this.append(new ChatMessageListItem(messages, {
                    newMessageIds: [],
                    signedUserId: this.options.signedUserId,
                }, this.interactions));
            }
        }
    }
    groupMessagesByAuthor(messages) {
        const grouped = [];
        let currentGroup = [];
        let lastAuthorId = null;
        let lastMessageTime = null;
        for (const message of messages) {
            const messageTime = new Date(message.created_at);
            if (message.author.user_id !== lastAuthorId ||
                (lastMessageTime &&
                    (messageTime.getTime() - lastMessageTime.getTime()) >= 60000)) {
                if (currentGroup.length > 0) {
                    grouped.push(currentGroup);
                }
                currentGroup = [];
            }
            currentGroup.push(message);
            lastAuthorId = message.author.user_id;
            lastMessageTime = messageTime;
        }
        if (currentGroup.length > 0) {
            grouped.push(currentGroup);
        }
        return grouped;
    }
}
//# sourceMappingURL=ChatMessageList.js.map