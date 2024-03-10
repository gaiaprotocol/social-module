import { BrowserInfo, Button, ButtonType, el, MaterialIcon, msg, Popup, } from "@common-module/app";
export default class PWAInstallPopup extends Popup {
    constructor(serviceName) {
        super(".pwa-install-popup", { barrierDismissible: true });
        if (true || BrowserInfo.isAndroid) {
            this.header.append(el("h1", msg("pwa-install-popup-android-title", { serviceName })), new Button({
                tag: ".close",
                type: ButtonType.Circle,
                icon: new MaterialIcon("close"),
                click: () => this.delete(),
            }));
            this.main.append(el("p", msg("pwa-install-popup-android-message-1", { serviceName })), el("ol", el("li", msg("pwa-install-popup-android-step-1", { serviceName }), el("img", {
                src: "https://resources.gaia.cc/images/pwa-install-popup/android/1.jpg",
            })), el("li", msg("pwa-install-popup-android-step-2", { serviceName }), el("img", {
                src: "https://resources.gaia.cc/images/pwa-install-popup/android/2.jpg",
            })), el("li", msg("pwa-install-popup-android-step-3", { serviceName }), el("img", {
                src: "https://resources.gaia.cc/images/pwa-install-popup/android/3.jpg",
            })), el("li", msg("pwa-install-popup-android-step-4", { serviceName }))), el("p", msg("pwa-install-popup-android-message-2", { serviceName })));
        }
        else {
            this.header.append(el("h1", msg("pwa-install-popup-ios-title", { serviceName })), new Button({
                tag: ".close",
                type: ButtonType.Circle,
                icon: new MaterialIcon("close"),
                click: () => this.delete(),
            }));
            this.main.append(el("p", msg("pwa-install-popup-ios-message-1", { serviceName })), el("ol", el("li", msg("pwa-install-popup-ios-step-1", { serviceName }), el("img", {
                src: "https://resources.gaia.cc/images/pwa-install-popup/ios/1.jpg",
            })), el("li", msg("pwa-install-popup-ios-step-2", { serviceName }), el("img", {
                src: "https://resources.gaia.cc/images/pwa-install-popup/ios/2.jpg",
            })), el("li", msg("pwa-install-popup-ios-step-3", { serviceName }), el("img", {
                src: "https://resources.gaia.cc/images/pwa-install-popup/ios/3.jpg",
            })), el("li", msg("pwa-install-popup-ios-step-4", { serviceName }), el("img", {
                src: "https://resources.gaia.cc/images/pwa-install-popup/ios/4.jpg",
            }))), el("p", msg("pwa-install-popup-ios-message-2", { serviceName })));
        }
        this.footer.append(new Button({
            tag: ".confirm-button",
            title: "OK",
            click: () => this.delete(),
        }));
    }
}
//# sourceMappingURL=PWAInstallPopup.js.map