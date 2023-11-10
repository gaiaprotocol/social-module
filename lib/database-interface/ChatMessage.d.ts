import { I18NText, Rich } from "common-app-module";
import Author from "./Author.js";
export declare enum MessageType {
    MESSAGE = 0,
    FILE_UPLOAD = 1,
    POST_REF = 2
}
export default interface ChatMessage {
    id: number;
    author: Author;
    message_type: MessageType;
    message?: string;
    translated?: I18NText;
    rich?: Rich;
    created_at: string;
    updated_at?: string;
}
//# sourceMappingURL=ChatMessage.d.ts.map