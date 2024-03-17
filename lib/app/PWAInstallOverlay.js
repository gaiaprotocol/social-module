import { Button, ButtonType, DomNode, el, MaterialIcon, } from "@common-module/app";
import PWAInstallPopup from "../help/PWAInstallPopup.js";
export default class PWAInstallOverlay extends DomNode {
    constructor(serviceName) {
        super(".pwa-install-overlay");
        this.append(el("img.icon", { src: "/images/logo.png", alt: "Logo" }), el("h1", "Add To Home Screen"), el("p", "To install the app, you need to add this website to your home screen."), new Button({
            icon: new MaterialIcon("download"),
            title: "How to Install",
            type: ButtonType.Contained,
            click: () => new PWAInstallPopup(serviceName),
        }));
    }
}
//# sourceMappingURL=PWAInstallOverlay.js.map