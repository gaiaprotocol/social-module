import { UploadForm } from "@common-module/app";
export default abstract class ChatMessageForm extends UploadForm {
    private form;
    private input;
    private nextTempId;
    constructor(tag: string, focus?: boolean);
    private submit;
    private _sendMessage;
    protected abstract sendMessage(message: string, files: File[]): Promise<number>;
}
//# sourceMappingURL=ChatMessageForm.d.ts.map