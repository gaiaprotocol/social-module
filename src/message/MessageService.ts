import { Supabase, SupabaseService } from "common-app-module";
import Message from "../database-interface/Message.js";

export default class MessageService<T extends Message> extends SupabaseService {
  public async deleteMessage(messageId: number) {
    const { error } = await Supabase.client.from(this.tableName).delete().eq(
      "id",
      messageId,
    );
    if (error) throw error;
  }
}
