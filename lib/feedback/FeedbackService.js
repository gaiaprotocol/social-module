import { SupabaseService } from "@common-module/app";
class FeedbackService extends SupabaseService {
    constructor() {
        super("feedbacks", "*", 50);
    }
    async createFeedback(feedback) {
        await this.safeInsert(feedback);
    }
}
export default new FeedbackService();
//# sourceMappingURL=FeedbackService.js.map