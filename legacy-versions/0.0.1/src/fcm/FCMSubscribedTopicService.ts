import { SupabaseService } from "@common-module/app";

class FCMSubscribedTopicService extends SupabaseService<{ topic: string }> {
  constructor() {
    super("fcm_subscribed_topics", "topic", 100);
  }

  public async fetchAll(userId: string) {
    return await this.safeSelect((b) => b.eq("user_id", userId), 1000);
  }
}

export default new FCMSubscribedTopicService();
