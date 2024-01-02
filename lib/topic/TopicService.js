import { Constants, SupabaseService } from "@common-module/app";
export default class TopicService extends SupabaseService {
    constructor(tableName, selectQuery, fetchLimit) {
        super(tableName, selectQuery, fetchLimit);
    }
    async fetchGlobalTopics(lastTopicCreatedAt) {
        return await this.safeSelect((b) => b.gt("created_at", lastTopicCreatedAt ?? Constants.UNIX_EPOCH_START_DATE)
            .order("created_at", { ascending: false }));
    }
}
//# sourceMappingURL=TopicService.js.map