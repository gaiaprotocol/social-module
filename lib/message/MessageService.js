import { Supabase, SupabaseService } from "common-app-module";
export default class MessageService extends SupabaseService {
    async deleteMessage(messageId) {
        const { error } = await Supabase.client.from(this.tableName).delete().eq("id", messageId);
        if (error)
            throw error;
    }
}
//# sourceMappingURL=MessageService.js.map