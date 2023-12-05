import { SupabaseService } from "common-app-module";
import Message from "../database-interface/Message.js";

export default class MessageService<T extends Message>
  extends SupabaseService<T> {
  public async deleteMessage(messageId: number) {
    await this.safeDelete((b) => b.eq("id", messageId));
  }
}
