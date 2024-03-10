import { Button, ButtonType, el, MaterialIcon, msg, Popup, } from "@common-module/app";
export default class XAccountEmailRequiredPopup extends Popup {
    constructor() {
        super(".x-account-email-required-popup", { barrierDismissible: true });
        this.header.append(el("h1", msg("x-account-email-required-popup-title")), new Button({
            tag: ".close",
            type: ButtonType.Circle,
            icon: new MaterialIcon("close"),
            click: () => this.delete(),
        }));
        this.main.append(el("p", msg("x-account-email-required-popup-message-1")), el("ol", el("li", msg("x-account-email-required-popup-step-1"), el("img", {
            src: "https://resources.gaia.cc/images/x-account-email-required-popup/1.jpg",
        })), el("li", msg("x-account-email-required-popup-step-2"), el("img", {
            src: "https://resources.gaia.cc/images/x-account-email-required-popup/2.jpg",
        })), el("li", msg("x-account-email-required-popup-step-3"), el("img", {
            src: "https://resources.gaia.cc/images/x-account-email-required-popup/3.jpg",
        })), el("li", msg("x-account-email-required-popup-step-4"), el("img", {
            src: "https://resources.gaia.cc/images/x-account-email-required-popup/4.jpg",
        })), el("li", msg("x-account-email-required-popup-step-5"), el("img", {
            src: "https://resources.gaia.cc/images/x-account-email-required-popup/5.jpg",
        })), el("li", msg("x-account-email-required-popup-step-6"), el("img", {
            src: "https://resources.gaia.cc/images/x-account-email-required-popup/6.jpg",
        })), el("li", msg("x-account-email-required-popup-step-7"), el("img", {
            src: "https://resources.gaia.cc/images/x-account-email-required-popup/7.jpg",
        }))), el("p", msg("x-account-email-required-popup-message-2")));
        this.footer.append(new Button({
            tag: ".confirm-button",
            title: "OK",
            click: () => this.delete(),
        }));
    }
}
//# sourceMappingURL=XAccountEmailRequiredPopup.js.map