import { Supabase, SupabaseService } from "common-app-module";
import Message from "../database-interface/Message.js";

export default class MessageService<T extends Message> extends SupabaseService {
  public async fetchGlobalMessages(lastMessageId?: number): Promise<T[]> {
    return await this.safeFetch((b) =>
      b.select(this.selectQuery).lt(
        "id",
        lastMessageId ?? Number.MAX_SAFE_INTEGER,
      ).order("id", { ascending: false }).limit(this.fetchLimit)
    ) ?? [];
  }

  public async deleteMessage(messageId: number) {
    const { error } = await Supabase.client.from(this.tableName).delete().eq(
      "id",
      messageId,
    );
    if (error) throw error;
  }
}
