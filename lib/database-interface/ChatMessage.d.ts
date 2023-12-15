import Message from "./Message.js";
export default interface ChatMessage<T> extends Message {
    source: T;
    external_author_id?: string;
    external_author_name?: string;
    external_author_avatar?: string;
    external_message_id?: string;
}
//# sourceMappingURL=ChatMessage.d.ts.map