import { Supabase, SupabaseService } from "common-app-module";
export default class MessageService extends SupabaseService {
    async fetchGlobalMessages(lastMessageId) {
        return await this.safeFetch((b) => b.select(this.selectQuery).lt("id", lastMessageId ?? Number.MAX_SAFE_INTEGER).order("id", { ascending: false }).limit(this.fetchLimit)) ?? [];
    }
    async deleteMessage(messageId) {
        const { error } = await Supabase.client.from(this.tableName).delete().eq("id", messageId);
        if (error)
            throw error;
    }
}
//# sourceMappingURL=MessageService.js.map