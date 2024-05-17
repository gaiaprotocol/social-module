import { Picker } from "emoji-picker-element";
import SocialComponent from "../SocialComponent.js";
export default class EmojiPicker extends SocialComponent {
    showing = false;
    picker = new Picker();
    constructor() {
        super(".emoji-picker");
        this.addAllowedEvents("select");
        this.picker.addEventListener("emoji-click", this.emojiClick);
        this.domElement.appendChild(this.picker);
    }
    emojiClick = (event) => {
        this.emit("select", event.detail.unicode);
    };
    _hide = (event) => {
        if (!this.domElement.contains(event.target)) {
            this.hide();
        }
    };
    show(left, top) {
        this.showing = true;
        this.style({ left, top });
        setTimeout(() => this.onWindow("click", this._hide));
    }
    hide() {
        this.showing = false;
        this.style({ left: -999999, top: -999999 });
        this.offWindow("click", this._hide);
    }
    delete() {
        this.picker.removeEventListener("emoji-click", this.emojiClick);
        this.domElement.removeChild(this.picker);
        super.delete();
    }
}
//# sourceMappingURL=EmojiPicker.js.map