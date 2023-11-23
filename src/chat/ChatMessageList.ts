import { ListLoadingBar, Store } from "common-app-module";
import { DomChild } from "common-app-module/lib/dom/DomNode.js";
import SoFiComponent from "../SoFiComponent.js";
import Author from "../database-interface/Author.js";
import Message from "../database-interface/Message.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
import ChatMessageListItem from "./ChatMessageListItem.js";

export default abstract class ChatMessageList extends SoFiComponent {
  private store: Store;

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
            newMessageIds: [],
            signedUserId: options.signedUserId,
          }, interactions),
        );
      }
    } else {
      this.append(initialLoadingAnimation);
    }

    this.refresh();
  }

  protected abstract fetchMessages(): Promise<Message[]>;

  private async refresh() {
    this.append(new ListLoadingBar());

    const messages = await this.fetchMessages();

    this.store.set("cached-messages", messages, true);

    if (!this.deleted) {
      this.empty();
      const groupedMessages = this.groupMessagesByAuthor(messages);
      for (const messages of groupedMessages) {
        this.append(
          new ChatMessageListItem(messages, {
            newMessageIds: [],
            signedUserId: this.options.signedUserId,
          }, this.interactions),
        );
      }
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

  public messageSending(
    tempId: number,
    author: Author,
    message: string,
    files: File[],
  ) {
    //TODO:
  }

  public messageSent(tempId: number, id: number) {
    //TODO:
  }
}
