import {
  Button,
  ButtonType,
  DomNode,
  el,
  MaterialIcon,
} from "@common-module/app";
import PWAInstallPopup from "../help/PWAInstallPopup.js";

export default class PWAInstallOverlay extends DomNode {
  constructor(serviceName: string, overviewUrl: string) {
    super(".pwa-install-overlay");
    this.append(
      el(
        "main",
        el("h1", serviceName),
        el("img.icon", { src: "/images/logo.png", alt: "Logo" }),
        el("h2", "Add To Home Screen"),
        el(
          "p",
          `To install ${serviceName} app, you need to add this website to your home screen.`,
        ),
        new Button({
          type: ButtonType.Contained,
          icon: new MaterialIcon("download"),
          title: "How to Install",
          onClick: () => new PWAInstallPopup(serviceName),
        }),
        el("a.help", `What is ${serviceName}?`, {
          href: overviewUrl,
          target: "_blank",
        }),
      ),
      el(
        "footer",
        el("a.cancel", "Maybe later", { onClick: () => this.delete() }),
      ),
    );
  }
}
