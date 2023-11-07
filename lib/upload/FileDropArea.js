import SocialComponent from "../SocialComponent.js";
export default class FileDropArea extends SocialComponent {
    constructor(tag, onDrop) {
        super(tag + ".file-drop-area");
        this.onDom("dragenter", (event) => {
            event.preventDefault();
            this.highlight();
        });
        this.onDom("dragover", (event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy";
            this.highlight();
        });
        this.onDom("dragleave", () => this.unhighlight());
        this.onDom("drop", (event) => {
            event.preventDefault();
            onDrop(Array.from(event.dataTransfer.files));
            this.unhighlight();
        });
    }
    highlight() {
        this.addClass("highlight");
    }
    unhighlight() {
        this.deleteClass("highlight");
    }
}
//# sourceMappingURL=FileDropArea.js.map