import { SupabaseService } from "common-app-module";
import Message from "../database-interface/Message.js";
export default class MessageService<T extends Message> extends SupabaseService<T> {
    deleteMessage(messageId: number): Promise<void>;
}
//# sourceMappingURL=MessageService.d.ts.map