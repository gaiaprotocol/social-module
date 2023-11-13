import { SupabaseService } from "common-app-module";
export default class MessageService extends SupabaseService {
    async fetchGlobalMessages(lastMessageId) {
        return await this.safeFetch((b) => b.select(this.selectQuery).lt("id", lastMessageId ?? Number.MAX_SAFE_INTEGER).order("id", { ascending: false }).limit(this.fetchLimit)) ?? [];
    }
}
//# sourceMappingURL=MessageService.js.map