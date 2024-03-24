import { EventContainer, Supabase } from "@common-module/app";
import FCMSubscribedTopicService from "./FCMSubscribedTopicService.js";

class FCMTopicSubscribeManager extends EventContainer {
  private subscribedTopics: Set<string> = new Set();

  constructor() {
    super();
    this.addAllowedEvents("subscribe", "unsubscribe");
  }

  public async loadSignedUserSubscribedTopics(userId: string) {
    const topicDataSet = await FCMSubscribedTopicService.fetch(userId);
    for (const topicData of topicDataSet) {
      this.subscribedTopics.add(topicData.topic);
    }
  }

  public async subscribe(topic: string) {
    this.subscribedTopics.add(topic);
    this.fireEvent("subscribe", topic);
    const { error } = await Supabase.client.functions.invoke(
      "subscribe-fcm-topic",
      { body: { topic } },
    );
    if (error) throw error;
  }

  public async unsubscribe(topic: string) {
    this.subscribedTopics.delete(topic);
    this.fireEvent("unsubscribe", topic);
    const { error } = await Supabase.client.functions.invoke(
      "unsubscribe-fcm-topic",
      { body: { topic } },
    );
    if (error) throw error;
  }

  public isSubscribed(topic: string) {
    return this.subscribedTopics.has(topic);
  }
}

export default new FCMTopicSubscribeManager();
