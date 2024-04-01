import { Picker } from "emoji-picker-element";
import SocialComponent from "../SocialComponent.js";
export default class EmojiPicker extends SocialComponent {
    showing = false;
    constructor() {
        super(".emoji-picker");
        this.addAllowedEvents("select");
        const picker = new Picker();
        picker.addEventListener("emoji-click", (event) => this.fireEvent("select", event.detail.unicode));
        this.domElement.appendChild(picker);
    }
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
}
//# sourceMappingURL=EmojiPicker.js.map