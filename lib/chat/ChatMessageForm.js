import { Button, ButtonType, el, ErrorAlert, FileDropArea, Icon, msg, UploadForm, } from "@common-module/app";
export default class ChatMessageForm extends UploadForm {
    form;
    input;
    nextTempId = 0;
    constructor(tag, focus = true) {
        super(tag + ".chat-message-form.social-component");
        this.addAllowedEvents("messageSending", "messageSent");
        this.append(this.uploadPreviewArea = el(".upload-preview-area"), el("main", el("section.rich", new Button({
            type: ButtonType.Circle,
            tag: ".attachment",
            icon: new Icon("attachment"),
            click: () => this.openFileSelector(),
        })), this.form = el("form", el(".input-container", this.input = new FileDropArea({ tag: "p.message-input", contenteditable: true }, (files) => this.appendFiles(files)), { click: () => this.input.domElement.focus() }), new Button({
            type: ButtonType.Circle,
            tag: ".send",
            icon: new Icon("send"),
        }), { submit: (event) => this.submit(event) })));
        this.input.onDom("keydown", (event) => {
            if (event.key === "Enter" && !event.shiftKey && event.keyCode !== 229) {
                this.submit(event);
            }
        });
        if (focus) {
            this.on("visible", () => this.input.domElement.focus());
        }
    }
    submit(event) {
        event.preventDefault();
        const message = this.input.domElement.innerText;
        if (message) {
            this._sendMessage(message, this.toUploadFiles);
            this.input.domElement.innerText = "";
            this.clearUploads();
        }
    }
    async _sendMessage(message, files) {
        if (message.length > 1000) {
            new ErrorAlert({
                title: msg("message-too-long-alert-title"),
                message: msg("message-too-long-alert-message", {
                    maxLength: 1000,
                }),
            });
            return;
        }
        const tempId = this.nextTempId -= 1;
        this.fireEvent("messageSending", tempId, message, files);
        const messageId = await this.sendMessage(message, files);
        this.fireEvent("messageSent", tempId, messageId);
    }
}
//# sourceMappingURL=ChatMessageForm.js.map