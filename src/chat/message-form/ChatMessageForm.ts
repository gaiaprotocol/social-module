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

  constructor(tag: string, focus: boolean = true) {
    super(tag + ".chat-message-form.social-component");
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
              if (message) this.sendMessage(message, this.toUploadFiles);
              this.textarea.domElement.value = "";
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

  protected abstract sendMessage(message: string, files: File[]): void;
}
