import {
  Button,
  DomNode,
  el,
  FileDropArea,
  Icon,
  UploadForm,
} from "common-app-module";

export default abstract class ChatMessageForm extends UploadForm {
  private form: DomNode<HTMLFormElement>;
  private textarea: DomNode<HTMLTextAreaElement>;
  private nextTempId = 0;

  constructor(tag: string, focus: boolean = true) {
    super(tag + ".chat-message-form.social-component");
    this.addAllowedEvents("messageSending", "messageSent");
    this.append(
      this.uploadPreviewArea = el(".upload-preview-area"),
      el(
        "main",
        el(
          "section.rich",
          el("button", new Icon("attachment"), {
            click: () => this.openFileSelector(),
          }),
        ),
        this.form = el(
          "form",
          this.textarea = new FileDropArea<HTMLTextAreaElement>(
            "textarea",
            (files) => this.appendFiles(files),
          ),
          new Button({ tag: ".send", title: "Send" }),
          {
            submit: (event) => {
              event.preventDefault();
              const message = this.textarea.domElement.value;
              if (message) this._sendMessage(message, this.toUploadFiles);
              this.textarea.domElement.value = "";
              this.clearUploads();
            },
          },
        ),
      ),
    );

    this.textarea.domElement.autocomplete = "off";
    this.textarea.onDom("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        this.form.fireDomEvent("submit");
      }
    });

    if (focus) {
      this.on("visible", () => this.textarea.domElement.focus());
    }
  }

  private async _sendMessage(message: string, files: File[]) {
    const tempId = this.nextTempId -= 1;
    this.fireEvent("messageSending", tempId, message, files);
    const messageId = await this.sendMessage(message, files);
    this.fireEvent("messageSent", tempId, messageId);
  }

  protected abstract sendMessage(
    message: string,
    files: File[],
  ): Promise<number>;
}
