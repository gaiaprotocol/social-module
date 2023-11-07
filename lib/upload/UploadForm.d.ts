import { DomNode } from "common-app-module";
import SocialComponent from "../SocialComponent.js";
export default abstract class UploadForm extends SocialComponent {
    protected toUploadFiles: File[];
    protected uploadPreviewArea: DomNode | undefined;
    private uploadInput;
    protected openFileSelector(): void;
    protected appendFiles(files: File[]): void;
    private appendPreview;
}
//# sourceMappingURL=UploadForm.d.ts.map