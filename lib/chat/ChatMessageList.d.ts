import { DomChild } from "@common-module/app/lib/dom/DomNode.js";
import SocialComponent from "../SocialComponent.js";
import Author from "../database-interface/Author.js";
import ChatMessage from "../database-interface/ChatMessage.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
export default abstract class ChatMessageList<ST> extends SocialComponent {
    private options;
    private interactions;
    private store;
    private addedMessageIds;
    constructor(tag: string, options: {
        storeName: string;
        signedUserId?: string;
        emptyMessage: string;
    }, interactions: ChatMessageInteractions<ST>, initialLoadingAnimation: DomChild);
    protected abstract fetchMessages(): Promise<ChatMessage<ST>[]>;
    private refresh;
    private groupMessagesByAuthor;
    private addItem;
    private addNewItem;
    messageSending(tempId: number, source: ST, author: Author, message: string, files: File[]): void;
    messageSent(tempId: number, id: number): void;
    addNewMessage(message: ChatMessage<ST>): void;
    protected scrolledToBottom(appendHeight?: number): boolean;
    scrollToBottom(): void;
}
//# sourceMappingURL=ChatMessageList.d.ts.map