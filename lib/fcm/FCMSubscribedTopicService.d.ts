import { SupabaseService } from "@common-module/app";
declare class FCMSubscribedTopicService extends SupabaseService<{
    topic: string;
}> {
    constructor();
    fetchAll(userId: string): Promise<{
        topic: string;
    }[]>;
}
declare const _default: FCMSubscribedTopicService;
export default _default;
//# sourceMappingURL=FCMSubscribedTopicService.d.ts.map