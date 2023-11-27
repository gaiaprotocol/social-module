declare const msg: {
    (keyOrMessages: string | import("common-app-module").I18NText, replacements?: {
        [key: string]: string | number | undefined;
    } | undefined, defaultLanguage?: string | undefined): any;
    setMessages(messages: {
        [lang: string]: {
            [key: string]: string;
        };
    }): Promise<void>;
    getMessages(key: string): import("common-app-module").I18NText;
    getLangMessages(keyOrMessages: string | import("common-app-module").I18NText, defaultLanguage?: string | undefined): {
        [x: string]: any;
    };
};
export default msg;
//# sourceMappingURL=msg.d.ts.map