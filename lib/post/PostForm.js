import { Button, el, FileDropArea, Icon, msg, UploadForm, } from "common-app-module";
export default class PostForm extends UploadForm {
    textarea;
    postButton;
    constructor(authorProfileImage, focus = false) {
        super(".post-form.social-component");
        this.append(el("main", el(".author-profile-image", {
            style: { backgroundImage: `url(${authorProfileImage})` },
        }), el("form", this.textarea = new FileDropArea("textarea", (files) => this.appendFiles(files)), this.uploadPreviewArea = el(".upload-preview-area"))), el("footer", el("section.rich", el("button", new Icon("image"), {
            click: () => this.openFileSelector(),
        })), this.postButton = new Button({
            tag: ".post",
            title: msg("post-form-post-button"),
            click: () => this._post(this.textarea.domElement.value, this.toUploadFiles),
        })));
        if (focus) {
            this.on("visible", () => this.textarea.domElement.focus());
        }
    }
    async _post(message, files) {
        this.postButton.disable().text = msg("post-form-posting-button");
        try {
            await this.post(message, files);
            if (this.deleted)
                return;
            this.textarea.domElement.value = "";
            this.clearUploads();
        }
        catch (error) {
            console.error(error);
        }
        this.postButton.enable().text = msg("post-form-post-button");
    }
}
//# sourceMappingURL=PostForm.js.map