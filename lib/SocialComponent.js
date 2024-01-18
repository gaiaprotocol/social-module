import { DomNode, msg } from "@common-module/app";
import messages_en from "../locales/en.yml";
import messages_ja from "../locales/ja.yml";
import messages_zh from "../locales/zh.yml";
import messages_zh_HK from "../locales/zh_HK.yml";
import messages_zh_TW from "../locales/zh_TW.yml";
export default class SocialComponent extends DomNode {
    constructor(tag, ...nodes) {
        super(tag + ".social-component");
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
//# sourceMappingURL=SocialComponent.js.map