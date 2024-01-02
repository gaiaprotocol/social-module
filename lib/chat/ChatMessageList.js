import { ListLoadingBar, Store } from "@common-module/app";
import SoFiComponent from "../SoFiComponent.js";
import ChatMessageListItem from "./ChatMessageListItem.js";
export default class ChatMessageList extends SoFiComponent {
    options;
    interactions;
    store;
    addedMessageIds = [];
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
                    signedUserId: options.signedUserId,
                }, interactions));
            }
            this.on("visible", () => {
                this.scrollToBottom();
                setTimeout(() => {
                    if (!this.deleted)
                        this.scrollToBottom();
                });
            });
        }
        else {
            this.append(initialLoadingAnimation);
        }
        setTimeout(() => this.refresh());
    }
    async refresh() {
        this.append(new ListLoadingBar());
        const messages = (await this.fetchMessages()).reverse();
        this.store.set("cached-messages", messages, true);
        if (!this.deleted) {
            this.empty();
            const groupedMessages = this.groupMessagesByAuthor(messages);
            for (const messages of groupedMessages) {
                this.addItem(messages);
            }
            this.scrollToBottom();
        }
    }
    groupMessagesByAuthor(messages) {
        const grouped = [];
        let currentGroup = [];
        let lastAuthorId = null;
        let lastMessageTime = null;
        for (const message of messages) {
            const messageTime = new Date(message.created_at);
            const messageAuthorId = message.author
                ? message.author.user_id
                : message.external_author_id;
            if (messageAuthorId !== lastAuthorId ||
                (lastMessageTime &&
                    (messageTime.getTime() - lastMessageTime.getTime()) >= 60000)) {
                if (currentGroup.length > 0) {
                    grouped.push(currentGroup);
                }
                currentGroup = [];
            }
            currentGroup.push(message);
            lastAuthorId = messageAuthorId;
            lastMessageTime = messageTime;
        }
        if (currentGroup.length > 0) {
            grouped.push(currentGroup);
        }
        return grouped;
    }
    addItem(messages) {
        const item = new ChatMessageListItem(messages, {
            signedUserId: this.options.signedUserId,
        }, this.interactions).appendTo(this);
        item.on("imageLoaded", (imageHeight) => {
            if (this.scrolledToBottom(imageHeight))
                this.scrollToBottom();
        });
        return item;
    }
    addNewItem(message, wait, scrollToBottom) {
        const lastMessageItem = this.children.length
            ? this.children[this.children.length - 1]
            : undefined;
        const lastMessageAuthorId = lastMessageItem?.firstMessage?.author
            ? lastMessageItem.firstMessage.author.user_id
            : lastMessageItem?.firstMessage?.external_author_id;
        const messageAuthorId = message.author
            ? message.author.user_id
            : message.external_author_id;
        if (lastMessageAuthorId !== messageAuthorId) {
            const item = this.addItem([message]);
            item.addClass("new");
            if (wait)
                item.addClass("wait");
        }
        else if (lastMessageItem) {
            lastMessageItem.addMessage(message, wait);
        }
        if (scrollToBottom || this.scrolledToBottom())
            this.scrollToBottom();
    }
    messageSending(tempId, source, author, message, files) {
        this.addNewItem({
            id: tempId,
            source,
            author,
            message,
            rich: {
                files: files.map((file) => ({
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type,
                    url: URL.createObjectURL(file),
                })),
            },
            created_at: new Date().toISOString(),
        }, true, true);
    }
    messageSent(tempId, id) {
        this.addedMessageIds.push(id);
    }
    addNewMessage(message) {
        if (!this.addedMessageIds.includes(message.id)) {
            this.addNewItem(message);
            this.addedMessageIds.push(message.id);
        }
        const cachedMessages = this.store.get("cached-messages") ?? [];
        cachedMessages.push(message);
        this.store.set("cached-messages", cachedMessages, true);
    }
    scrolledToBottom(appendHeight = 0) {
        return (this.domElement.scrollTop >=
            this.domElement.scrollHeight - this.domElement.clientHeight - 100 -
                appendHeight);
    }
    scrollToBottom() {
        this.domElement.scrollTo(0, this.domElement.scrollHeight);
    }
}
//# sourceMappingURL=ChatMessageList.js.map