import { UploadForm } from "common-app-module";
export default abstract class ChatMessageForm extends UploadForm {
    private form;
    private textarea;
    constructor(tag: string, focus?: boolean);
    protected abstract sendMessage(message: string, files: File[]): void;
}
//# sourceMappingURL=ChatMessageForm.d.ts.map