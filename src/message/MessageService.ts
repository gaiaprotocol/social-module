import { SupabaseService } from "common-app-module";
import Message from "../database-interface/Message.js";

export default class MessageService<T extends Message> extends SupabaseService {
  public async fetchGlobalMessages(lastMessageId?: number): Promise<T[]> {
    return await this.safeFetch((b) =>
      b.select(this.selectQuery).lt(
        "id",
        lastMessageId ?? Number.MAX_SAFE_INTEGER,
      ).order("created_at", { ascending: false }).limit(this.fetchLimit)
    ) ?? [];
  }
}
