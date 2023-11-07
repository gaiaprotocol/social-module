import { Button, el, FileDropArea, Icon, UploadForm, } from "common-app-module";
export default class ChatMessageForm extends UploadForm {
    form;
    textarea;
    constructor(tag, focus = true) {
        super(tag + ".chat-message-form.social-component");
        this.append(this.uploadPreviewArea = el(".upload-preview-area"), el("main", el("section.rich", el("button", new Icon("attachment"), {
            click: () => this.openFileSelector(),
        })), this.form = el("form", this.textarea = new FileDropArea("textarea", (files) => this.appendFiles(files)), new Button({ tag: ".send", title: "Send" }), {
            submit: (event) => {
                event.preventDefault();
                const message = this.textarea.domElement.value;
                if (message)
                    this.sendMessage(message, this.toUploadFiles);
                this.textarea.domElement.value = "";
            },
        })));
        this.textarea.domElement.autocomplete = "off";
        this.textarea.onDom("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                this.form.fireDomEvent("submit");
            }
        });
        if (focus) {
            this.on("visible", () => this.textarea.domElement.focus());
        }
    }
}
//# sourceMappingURL=ChatMessageForm.js.map