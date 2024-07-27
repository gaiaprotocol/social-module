import { SupabaseService } from "@common-module/app";
import Feedback from "../database-interface/Feedback.js";

class FeedbackService extends SupabaseService<Feedback> {
  constructor() {
    super("feedbacks", "*", 50);
  }

  public async createFeedback(
    feedback: { user_id: string | undefined; feedback: string },
  ) {
    await this.safeInsert(feedback);
  }
}

export default new FeedbackService();
