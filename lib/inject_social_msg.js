import { msg } from "@common-module/app";
import messages_en from "../locales/en.yml";
import messages_ja from "../locales/ja.yml";
import messages_zh from "../locales/zh.yml";
import messages_zh_HK from "../locales/zh_HK.yml";
import messages_zh_TW from "../locales/zh_TW.yml";
export default function inject_social_msg() {
    msg.setMessages({
        en: messages_en,
        zh: messages_zh,
        "zh-tw": messages_zh_TW,
        "zh-hk": messages_zh_HK,
        ja: messages_ja,
    });
}
//# sourceMappingURL=inject_social_msg.js.map