import { BrowserInfo, Button, el, msg, Popup } from "@common-module/app";
export default class PushSettingPopup extends Popup {
    constructor(serviceName) {
        super(".push-setting-popup", { barrierDismissible: true });
        if (BrowserInfo.isAndroid) {
            if (BrowserInfo.installed) {
                this.header.append(el("h1", msg("push-setting-popup-android-app-title", { serviceName })));
                this.main.append(el("p", msg("push-setting-popup-android-app-message-1", { serviceName })), el("ol", el("li", msg("push-setting-popup-android-app-step-1", { serviceName }), el("img", {
                    src: "https://resources.gaia.cc/images/push-setting-popup/android/app/1.jpg",
                })), el("li", msg("push-setting-popup-android-app-step-2", { serviceName }), el("img", {
                    src: "https://resources.gaia.cc/images/push-setting-popup/android/app/2.jpg",
                })), el("li", msg("push-setting-popup-android-app-step-3", { serviceName }), el("img", {
                    src: "https://resources.gaia.cc/images/push-setting-popup/android/app/3.jpg",
                }))), el("p", msg("push-setting-popup-android-app-message-2", { serviceName })));
            }
            else {
                this.header.append(el("h1", msg("push-setting-popup-android-web-title", { serviceName })));
                this.main.append(el("p", msg("push-setting-popup-android-web-message-1", { serviceName })), el("ol", el("li", msg("push-setting-popup-android-web-step-1", { serviceName }), el("img", {
                    src: "https://resources.gaia.cc/images/push-setting-popup/android/web/1.jpg",
                })), el("li", msg("push-setting-popup-android-web-step-2", { serviceName }), el("img", {
                    src: "https://resources.gaia.cc/images/push-setting-popup/android/web/2.jpg",
                })), el("li", msg("push-setting-popup-android-web-step-3", { serviceName }), el("img", {
                    src: "https://resources.gaia.cc/images/push-setting-popup/android/web/3.jpg",
                })), el("li", msg("push-setting-popup-android-web-step-4", { serviceName }), el("img", {
                    src: "https://resources.gaia.cc/images/push-setting-popup/android/web/4.jpg",
                }))), el("p", msg("push-setting-popup-android-web-message-2", { serviceName })));
            }
        }
        else {
            this.header.append(el("h1", msg("push-setting-popup-ios-title", { serviceName })));
            this.main.append(el("p", msg("push-setting-popup-ios-message-1", { serviceName })), el("ol", el("li", msg("push-setting-popup-ios-step-1", { serviceName }), el("img", {
                src: "https://resources.gaia.cc/images/push-setting-popup/ios/1.jpg",
            })), el("li", msg("push-setting-popup-ios-step-2", { serviceName }), el("img", {
                src: "https://resources.gaia.cc/images/push-setting-popup/ios/2.jpg",
            })), el("li", msg("push-setting-popup-ios-step-3", { serviceName }), el("img", {
                src: "https://resources.gaia.cc/images/push-setting-popup/ios/3.jpg",
            }))), el("p", msg("push-setting-popup-ios-message-2", { serviceName })));
        }
        this.footer.append(new Button({
            tag: ".confirm-button",
            title: "OK",
            click: () => this.delete(),
        }));
    }
}
//# sourceMappingURL=PushSettingPopup.js.map