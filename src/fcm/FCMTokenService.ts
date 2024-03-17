import { SupabaseService } from "@common-module/app";
import FCMTokenInfo from "../database-interface/FCMTokenInfo.js";

class FCMTokenService extends SupabaseService<FCMTokenInfo> {
  constructor() {
    super("fcm_tokens", "user_id, subscribed_topics", 100);
  }

  public async fetch(userId: string, token: string) {
    return await this.safeSelectSingle((b) =>
      b.eq("user_id", userId).eq("token", token)
    );
  }
}

export default new FCMTokenService();
