import {
  AdaptiveModal,
  Alert,
  Button,
  ButtonType,
  DomNode,
  el,
} from "@common-module/app";
import FeedbackService from "./FeedbackService.js";

export default class LeaveFeedbackModal extends AdaptiveModal {
  private input: DomNode<HTMLTextAreaElement>;

  constructor(signedUserId: string | undefined) {
    super(".leave-feedback-modal", { barrierDismissible: true });
    this.title = "Leave Feedback";
    this.main.append(
      this.input = el("textarea", { placeholder: "Leave feedback here" }),
    );
    this.primaryButton = new Button({
      type: ButtonType.Contained,
      title: "Submit",
      click: async (event, button) => {
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
        } catch (e) {
          console.error(e);
          button.loading = false;
        }
      },
    });
  }
}
