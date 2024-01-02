import { Constants, SupabaseService } from "@common-module/app";
import Topic from "../database-interface/Topic.js";

export default class TopicService<T extends Topic = Topic>
  extends SupabaseService<T> {
  constructor(tableName: string, selectQuery: string, fetchLimit: number) {
    super(tableName, selectQuery, fetchLimit);
  }

  public async fetchGlobalTopics(lastTopicCreatedAt?: string) {
    return await this.safeSelect((b) =>
      b.gt("created_at", lastTopicCreatedAt ?? Constants.UNIX_EPOCH_START_DATE)
        .order("created_at", { ascending: false })
    );
  }
}
