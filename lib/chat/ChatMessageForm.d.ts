import { UploadForm } from "common-app-module";
export default abstract class ChatMessageForm extends UploadForm {
    private form;
    private textarea;
    constructor(tag: string, focus?: boolean);
    private _sendMessage;
    protected abstract sendMessage(message: string, files: File[]): Promise<number>;
}
//# sourceMappingURL=ChatMessageForm.d.ts.map