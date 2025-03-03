import {
  BodyNode,
  Button,
  ButtonType,
  el,
  msg,
  Router
} from "@common-module/app";
import SocialComponent from "../SocialComponent.js";

export default class AndroidFcmNotification extends SocialComponent {
  constructor(title: string, body: string, redirectTo: string) {
    super(".android-fcm-notification");

    this.append(
      el(".timer-bar"),
      el("header", el("h1", title)),
      el("main", el("p", body)),
      el(
        "footer",
        new Button({
          tag: ".cancel",
          title: msg("cancel-button"),
          onClick: () => this.delete(),
        }),
        new Button({
          type: ButtonType.Contained,
          tag: ".go",
          title: "Go",
          onClick: async () => {
            Router.go(redirectTo);
            this.delete();
          },
        }),
      ),
    );

    BodyNode.append(this);

    setTimeout(() => {
      if (!this.deleted) this.delete();
    }, 5000);
  }
}
