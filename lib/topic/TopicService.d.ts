import { SupabaseService } from "common-app-module";
import Topic from "../database-interface/Topic.js";
export default class TopicService<T extends Topic = Topic> extends SupabaseService<T> {
    constructor(tableName: string, selectQuery: string, fetchLimit: number);
    fetchGlobalTopics(lastTopicCreatedAt?: string): Promise<T[]>;
}
//# sourceMappingURL=TopicService.d.ts.map