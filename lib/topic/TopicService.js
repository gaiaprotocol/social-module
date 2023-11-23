import { SupabaseService } from "common-app-module";
export default class TopicService extends SupabaseService {
    constructor(tableName, selectQuery, fetchLimit) {
        super(tableName, selectQuery, fetchLimit);
    }
    async fetchGlobalTopics(lastTopicCreatedAt) {
        const data = await this.safeFetch((b) => b.select(this.selectQuery).limit(this.fetchLimit).gt("created_at", lastTopicCreatedAt ?? "1970-01-01T00:00:00.000Z").order("created_at", { ascending: false }));
        return data ?? [];
    }
}
//# sourceMappingURL=TopicService.js.map