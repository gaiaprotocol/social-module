import { DomChild } from "common-app-module/lib/dom/DomNode.js";
import SoFiComponent from "../SoFiComponent.js";
import Author from "../database-interface/Author.js";
import Message from "../database-interface/Message.js";
import ChatMessageInteractions from "./ChatMessageInteractions.js";
export default abstract class ChatMessageList extends SoFiComponent {
    private options;
    private interactions;
    private store;
    private addedMessageIds;
    constructor(tag: string, options: {
        storeName: string;
        signedUserId?: string;
        emptyMessage: string;
    }, interactions: ChatMessageInteractions, initialLoadingAnimation: DomChild);
    protected abstract fetchMessages(): Promise<Message[]>;
    private refresh;
    private groupMessagesByAuthor;
    private addItem;
    messageSending(tempId: number, author: Author, message: string, files: File[]): void;
    messageSent(tempId: number, id: number): void;
    addNewMessage(message: Message): void;
    protected get scrolledToBottom(): boolean;
    private scrollToBottom;
}
//# sourceMappingURL=ChatMessageList.d.ts.map