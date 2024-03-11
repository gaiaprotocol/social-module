import { SupabaseService } from "@common-module/app";
export default class MessageService extends SupabaseService {
    constructor(postTableName, selectQuery, fetchLimit) {
        super(postTableName, selectQuery, fetchLimit);
        this.addAllowedEvents("deleteMessage");
    }
    async fetchMessage(hashtag, messageId) {
        return await this.safeSelectSingle((b) => b.eq("id", messageId));
    }
    async deleteMessage(hashtag, messageId) {
        await this.safeDelete((b) => b.eq("id", messageId));
        this.fireEvent("deleteMessage", messageId);
    }
}
//# sourceMappingURL=MessageService.js.map