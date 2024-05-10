import { Picker } from "emoji-picker-element";
import SocialComponent from "../SocialComponent.js";
const picker = new Picker();
export default class EmojiPicker extends SocialComponent {
    showing = false;
    constructor() {
        super(".emoji-picker");
        this.addAllowedEvents("select");
        picker.addEventListener("emoji-click", this.emojiClick);
        this.domElement.appendChild(picker);
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
        picker.removeEventListener("emoji-click", this.emojiClick);
        this.domElement.removeChild(picker);
        super.delete();
    }
}
//# sourceMappingURL=EmojiPicker.js.map