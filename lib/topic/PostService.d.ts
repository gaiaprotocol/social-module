import { SupabaseService } from "common-app-module";
import Topic from "../database-interface/Topic.js";
export default class TopicService<T extends Topic> extends SupabaseService {
    constructor(tableName: string, selectQuery: string, fetchLimit: number);
    fetchGlobalTopics(lastTopicCreatedAt: string | undefined): Promise<any>;
}
//# sourceMappingURL=PostService.d.ts.map