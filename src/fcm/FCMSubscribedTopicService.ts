import { SupabaseService } from "@common-module/app";

class FCMSubscribedTopicService extends SupabaseService<{ topic: string }> {
  constructor() {
    super("fcm_subscribed_topics", "topic", 100);
  }

  public async fetch(userId: string) {
    return await this.safeSelect((b) => b.eq("user_id", userId));
  }
}

export default new FCMSubscribedTopicService();
