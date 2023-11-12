import {
  Button,
  DomNode,
  el,
  FileDropArea,
  Icon,
  msg,
  UploadForm,
} from "common-app-module";

export default abstract class PostForm extends UploadForm {
  private textarea: DomNode<HTMLTextAreaElement>;
  private postButton: Button;

  constructor(authorProfileImage: string, focus: boolean = false) {
    super(".post-form.social-component");
    this.append(
      el(
        "main",
        el(".author-profile-image", {
          style: { backgroundImage: `url(${authorProfileImage})` },
        }),
        el(
          "form",
          this.textarea = new FileDropArea<HTMLTextAreaElement>(
            "textarea",
            (files) => this.appendFiles(files),
          ),
          this.uploadPreviewArea = el(".upload-preview-area"),
        ),
      ),
      el(
        "footer",
        el(
          "section.rich",
          el("button", new Icon("image"), {
            click: () => this.openFileSelector(),
          }),
        ),
        this.postButton = new Button({
          tag: ".post",
          title: msg("post-form-post-button"),
          click: () =>
            this._post(this.textarea.domElement.value, this.toUploadFiles),
        }),
      ),
    );

    if (focus) {
      this.on("visible", () => this.textarea.domElement.focus());
    }
  }

  private async _post(message: string, files: File[]) {
    this.postButton.disable().text = msg("post-form-posting-button");
    try {
      await this.post(message, files);
      this.textarea.domElement.value = "";
      this.clearUploads();
    } catch (error) {
      console.error(error);
    }
    this.postButton.enable().text = msg("post-form-post-button");
  }

  protected abstract post(message: string, files: File[]): Promise<void>;
}
