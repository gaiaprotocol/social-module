import { AdaptiveModal, Alert, Button, ButtonType, el, } from "@common-module/app";
import FeedbackService from "./FeedbackService.js";
export default class LeaveFeedbackModal extends AdaptiveModal {
    input;
    constructor(signedUserId) {
        super(".leave-feedback-modal", { barrierDismissible: true });
        this.title = "Leave Feedback";
        this.main.append(this.input = el("textarea", { placeholder: "Leave feedback here" }));
        this.primaryButton = new Button({
            type: ButtonType.Contained,
            title: "Submit",
            onClick: async (button) => {
                button.loading = true;
                try {
                    await FeedbackService.createFeedback({
                        user_id: signedUserId,
                        feedback: this.input.domElement.value,
                    });
                    new Alert({
                        title: "Feedback submitted",
                        message: "Thank you for your feedback!",
                    });
                    this.delete();
                }
                catch (e) {
                    console.error(e);
                    button.loading = false;
                }
            },
        });
    }
}
//# sourceMappingURL=LeaveFeedbackModal.js.map