import { SupabaseService } from "common-app-module";
import Message from "../database-interface/Message.js";
export default class MessageService<T extends Message> extends SupabaseService {
    fetchGlobalMessages(lastMessageId?: number): Promise<T[]>;
}
//# sourceMappingURL=MessageService.d.ts.map