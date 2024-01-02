import { SupabaseService } from "@common-module/app";
import Message from "../database-interface/Message.js";

export default class MessageService<T extends Message>
  extends SupabaseService<T> {
  constructor(
    postTableName: string,
    selectQuery: string,
    fetchLimit: number,
  ) {
    super(postTableName, selectQuery, fetchLimit);
    this.addAllowedEvents("deleteMessage");
  }

  public async fetchMessage(messageId: number) {
    return await this.safeSelectSingle((b) => b.eq("id", messageId));
  }

  public async deleteMessage(messageId: number) {
    await this.safeDelete((b) => b.eq("id", messageId));
    this.fireEvent("deleteMessage", messageId);
  }
}
