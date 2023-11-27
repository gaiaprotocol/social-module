import { UploadForm } from "common-app-module";
export default abstract class PostForm extends UploadForm {
    private input;
    private postButton;
    constructor(authorProfileImage: string, focus?: boolean);
    private _post;
    protected abstract post(message: string, files: File[]): Promise<void>;
}
//# sourceMappingURL=PostForm.d.ts.map