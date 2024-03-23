import { SupabaseService } from "@common-module/app";
import Feedback from "../database-interface/Feedback.js";
declare class FeedbackService extends SupabaseService<Feedback> {
    constructor();
    createFeedback(feedback: {
        user_id: string | undefined;
        feedback: string;
    }): Promise<void>;
}
declare const _default: FeedbackService;
export default _default;
//# sourceMappingURL=FeedbackService.d.ts.map