import {
  BodyNode,
  BrowserInfo,
  Button,
  ButtonType,
  el,
  msg,
  Router,
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
          click: () => this.delete(),
        }),
        new Button({
          type: ButtonType.Contained,
          tag: ".go",
          title: "Go",
          click: async (event, button) => {
            Router.go(redirectTo);
            this.delete();
          },
        }),
      ),
    );

    // Android back button
    if (
      BrowserInfo.isAndroid &&
      BrowserInfo.installed && window.location.hash === ""
    ) {
      window.location.hash = "#exitable";
    }

    BodyNode.append(this);

    setTimeout(() => {
      if (!this.deleted) this.delete();
    }, 5000);
  }
}
