import { AdaptiveModal, Alert, Button, ButtonType, el, } from "@common-module/app";
import FeedbackService from "./FeedbackService.js";
export default class LeaveFeedbackModal extends AdaptiveModal {
    input;
    submitButton;
    constructor(signedUserId) {
        super(".leave-feedback-modal", { barrierDismissible: true });
        this.title = "Leave Feedback";
        this.main.append(el("form", this.input = el("textarea", { placeholder: "Leave feedback here" }), this.submitButton = new Button({
            tag: ".submit",
            type: ButtonType.Contained,
            title: "Submit",
        }), {
            submit: async (event) => {
                event.preventDefault();
                this.submitButton.loading = true;
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
                    this.submitButton.loading = false;
                }
            },
        }));
    }
}
//# sourceMappingURL=LeaveFeedbackModal.js.map