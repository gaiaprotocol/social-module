import { msg as appMSG } from "common-app-module";
import messages_en from "../locales/en.yml";
import messages_ja from "../locales/ja.yml";
import messages_zh from "../locales/zh.yml";
import messages_zh_HK from "../locales/zh_HK.yml";
import messages_zh_TW from "../locales/zh_TW.yml";

const msg = appMSG;

msg.setMessages({
  en: messages_en,
  zh: messages_zh,
  "zh-tw": messages_zh_TW,
  "zh-hk": messages_zh_HK,
  ja: messages_ja,
});

export default msg;
