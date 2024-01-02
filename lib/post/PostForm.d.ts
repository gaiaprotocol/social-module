import { UploadForm } from "@common-module/app";
export default abstract class PostForm extends UploadForm {
    private input;
    private postButton;
    constructor(authorProfileImages: (string | undefined)[], focus?: boolean);
    private _post;
    protected abstract post(message: string, files: File[]): Promise<void>;
}
//# sourceMappingURL=PostForm.d.ts.map