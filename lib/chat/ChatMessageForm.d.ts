import { Button, UploadForm } from "common-app-module";
export default abstract class ChatMessageForm extends UploadForm {
    private form;
    private input;
    private nextTempId;
    protected sendButton: Button;
    constructor(tag: string, focus?: boolean);
    private _sendMessage;
    protected abstract sendMessage(message: string, files: File[]): Promise<number>;
}
//# sourceMappingURL=ChatMessageForm.d.ts.map