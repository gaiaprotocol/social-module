import { SupabaseService } from "common-app-module";
export default class MessageService extends SupabaseService {
    async deleteMessage(messageId) {
        await this.safeDelete((b) => b.eq("id", messageId));
    }
}
//# sourceMappingURL=MessageService.js.map