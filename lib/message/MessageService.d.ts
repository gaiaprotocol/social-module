import { SupabaseService } from "common-app-module";
import Message from "../database-interface/Message.js";
export default class MessageService<T extends Message> extends SupabaseService<T> {
    constructor(postTableName: string, selectQuery: string, fetchLimit: number);
    deleteMessage(messageId: number): Promise<void>;
}
//# sourceMappingURL=MessageService.d.ts.map