import { Button, el, FileDropArea, Icon, UploadForm, } from "common-app-module";
import { v4 as uuidv4 } from "uuid";
export default class ChatMessageForm extends UploadForm {
    form;
    textarea;
    constructor(tag, focus = true) {
        super(tag + ".chat-message-form.social-component");
        this.addAllowedEvents("sendMessage");
        this.append(this.uploadPreviewArea = el(".upload-preview-area"), el("main", el("section.rich", el("button", new Icon("attachment"), {
            click: () => this.openFileSelector(),
        })), this.form = el("form", this.textarea = new FileDropArea("textarea", (files) => this.appendFiles(files)), new Button({ tag: ".send", title: "Send" }), {
            submit: (event) => {
                event.preventDefault();
                const message = this.textarea.domElement.value;
                if (message)
                    this._sendMessage(message, this.toUploadFiles);
                this.textarea.domElement.value = "";
                this.clearUploads();
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
    async _sendMessage(message, files) {
        const tempId = uuidv4();
        this.fireEvent("messageSending", { tempId, message, files });
        const messageId = await this.sendMessage(message, files);
        this.fireEvent("messageSent", { tempId, messageId });
    }
}
//# sourceMappingURL=ChatMessageForm.js.map