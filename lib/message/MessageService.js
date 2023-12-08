import { SupabaseService } from "common-app-module";
export default class MessageService extends SupabaseService {
    constructor(postTableName, selectQuery, fetchLimit) {
        super(postTableName, selectQuery, fetchLimit);
        this.addAllowedEvents("deleteMessage");
    }
    async fetchMessage(messageId) {
        return await this.safeSelectSingle((b) => b.eq("id", messageId));
    }
    async deleteMessage(messageId) {
        await this.safeDelete((b) => b.eq("id", messageId));
        this.fireEvent("deleteMessage", messageId);
    }
}
//# sourceMappingURL=MessageService.js.map