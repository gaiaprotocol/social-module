import { DomChild } from "@common-module/app/lib/dom/DomNode.js";
import SoFiComponent from "../SoFiComponent.js";
import Author from "../database-interface/Author.js";
import ChatMessage from "../database-interface/ChatMessage.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
export default abstract class ChatMessageList<S> extends SoFiComponent {
    private options;
    private interactions;
    private store;
    private addedMessageIds;
    constructor(tag: string, options: {
        storeName: string;
        signedUserId?: string;
        emptyMessage: string;
    }, interactions: ChatMessageInteractions<S>, initialLoadingAnimation: DomChild);
    protected abstract fetchMessages(): Promise<ChatMessage<S>[]>;
    private refresh;
    private groupMessagesByAuthor;
    private addItem;
    private addNewItem;
    messageSending(tempId: number, source: S, author: Author, message: string, files: File[]): void;
    messageSent(tempId: number, id: number): void;
    addNewMessage(message: ChatMessage<S>): void;
    protected scrolledToBottom(appendHeight?: number): boolean;
    private scrollToBottom;
}
//# sourceMappingURL=ChatMessageList.d.ts.map