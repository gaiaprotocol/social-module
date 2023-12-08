import { ListLoadingBar, Store } from "common-app-module";
import { DomChild } from "common-app-module/lib/dom/DomNode.js";
import SoFiComponent from "../SoFiComponent.js";
import Author from "../database-interface/Author.js";
import Message from "../database-interface/Message.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
import ChatMessageListItem from "./ChatMessageListItem.js";

export default abstract class ChatMessageList extends SoFiComponent {
  private store: Store;
  private addedMessageIds: number[] = [];

  constructor(
    tag: string,
    private options: {
      storeName: string;
      signedUserId?: string;
      emptyMessage: string;
    },
    private interactions: ChatMessageInteractions,
    initialLoadingAnimation: DomChild,
  ) {
    super(tag + ".chat-message-list");
    this.store = new Store(options.storeName);
    this.domElement.setAttribute("data-empty-message", options.emptyMessage);

    const cachedMessages = this.store.get<Message[]>("cached-messages");
    if (cachedMessages && cachedMessages.length > 0) {
      const groupedMessages = this.groupMessagesByAuthor(cachedMessages);
      for (const messages of groupedMessages) {
        this.append(
          new ChatMessageListItem(messages, {
            signedUserId: options.signedUserId,
          }, interactions),
        );
      }
      this.on("visible", () => {
        this.scrollToBottom();
        setTimeout(() => {
          if (!this.deleted) this.scrollToBottom();
        });
      });
    } else {
      this.append(initialLoadingAnimation);
    }

    setTimeout(() => this.refresh());
  }

  protected abstract fetchMessages(): Promise<Message[]>;

  private async refresh() {
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

  private groupMessagesByAuthor(messages: Message[]): Message[][] {
    const grouped = [];
    let currentGroup = [];
    let lastAuthorId = null;
    let lastMessageTime = null;

    for (const message of messages) {
      // Convert the message timestamp to a Date object
      const messageTime = new Date(message.created_at);

      // Start a new group if the author changes or the time difference is more than 1 minute
      if (
        message.author.user_id !== lastAuthorId ||
        (lastMessageTime &&
          (messageTime.getTime() - lastMessageTime.getTime()) >= 60000)
      ) {
        if (currentGroup.length > 0) {
          grouped.push(currentGroup);
        }
        currentGroup = [];
      }

      currentGroup.push(message);
      lastAuthorId = message.author.user_id;
      lastMessageTime = messageTime;
    }

    // Add the last group
    if (currentGroup.length > 0) {
      grouped.push(currentGroup);
    }

    return grouped;
  }

  private addItem(messages: Message[]) {
    const item = new ChatMessageListItem(messages, {
      signedUserId: this.options.signedUserId,
    }, this.interactions).appendTo(this);

    item.on(
      "imageLoaded",
      (imageHeight) => {
        if (this.scrolledToBottom(imageHeight)) this.scrollToBottom();
      },
    );

    return item;
  }

  private addNewItem(message: Message, wait?: boolean) {
    const lastMessageItem: ChatMessageListItem | undefined =
      this.children.length
        ? this.children[this.children.length - 1] as ChatMessageListItem
        : undefined;
    if (
      lastMessageItem?.firstMessage?.author.user_id !== message.author.user_id
    ) {
      const item = this.addItem([message]);

      item.addClass("new");
      if (wait) item.addClass("wait");
    } else {
      lastMessageItem.addMessage(message, wait);
    }

    if (this.scrolledToBottom()) this.scrollToBottom();
  }

  public messageSending(
    tempId: number,
    author: Author,
    message: string,
    files: File[],
  ) {
    this.addNewItem({
      id: tempId,
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
    }, true);
  }

  // The response indicating that a message has been sent arrives before the real-time message itself.
  public messageSent(tempId: number, id: number) {
    //TODO:
    console.log(tempId, id);
    this.addedMessageIds.push(id);
  }

  public addNewMessage(message: Message) {
    if (!this.addedMessageIds.includes(message.id)) {
      this.addNewItem(message);
      this.addedMessageIds.push(message.id);
    }

    const cachedMessages = this.store.get<Message[]>("cached-messages") ?? [];
    cachedMessages.push(message);
    this.store.set("cached-messages", cachedMessages, true);
  }

  protected scrolledToBottom(appendHeight = 0) {
    return (
      this.domElement.scrollTop >=
        this.domElement.scrollHeight - this.domElement.clientHeight - 100 -
          appendHeight
    );
  }

  private scrollToBottom() {
    this.domElement.scrollTo(
      0,
      this.domElement.scrollHeight,
    );
  }
}
