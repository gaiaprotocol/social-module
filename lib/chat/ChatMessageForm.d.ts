import { DomNode } from "common-app-module";
import { Rich } from "social-module";
import ChatMessage, { MessageType } from "../database-interface/ChatMessage.js";
export default abstract class ChatMessageForm extends DomNode {
    private uploadInput;
    private uploadButton;
    private messageInput;
    constructor(tag: string);
    private _upload;
    protected abstract sendMessage(message: string): void;
    protected abstract upload(file: File): Promise<void>;
    protected getOptimisticData(messageType: MessageType, message?: string, rich?: Rich): ChatMessage;
}
//# sourceMappingURL=ChatMessageForm.d.ts.map