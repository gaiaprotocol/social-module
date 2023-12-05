import { SupabaseService } from "common-app-module";
import Topic from "../database-interface/Topic.js";

export default class TopicService<T extends Topic = Topic>
  extends SupabaseService<T> {
  constructor(tableName: string, selectQuery: string, fetchLimit: number) {
    super(tableName, selectQuery, fetchLimit);
  }

  public async fetchGlobalTopics(lastTopicCreatedAt?: string) {
    return await this.safeSelect((b) =>
      b.gt("created_at", lastTopicCreatedAt ?? "1970-01-01T00:00:00.000Z")
        .order("created_at", { ascending: false })
    );
  }
}
