import { DomNode, msg } from "common-app-module";
import messages_en from "../locales/en.yml";
import messages_ja from "../locales/ja.yml";
import messages_zh from "../locales/zh.yml";
import messages_zh_HK from "../locales/zh_HK.yml";
import messages_zh_TW from "../locales/zh_TW.yml";
export default class SoFiComponent extends DomNode {
    constructor(tag, ...nodes) {
        super(tag + ".sofi-component");
        this.append(...nodes);
    }
    static loadMessages() {
        msg.setMessages({
            en: messages_en,
            zh: messages_zh,
            "zh-tw": messages_zh_TW,
            "zh-hk": messages_zh_HK,
            ja: messages_ja,
        });
    }
}
//# sourceMappingURL=SoFiComponent.js.map