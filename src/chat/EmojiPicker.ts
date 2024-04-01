import { Picker } from "emoji-picker-element";
import SocialComponent from "../SocialComponent.js";

const picker = new Picker();

export default class EmojiPicker extends SocialComponent {
  public showing: boolean = false;

  constructor() {
    super(".emoji-picker");
    this.addAllowedEvents("select");

    picker.addEventListener("emoji-click", this.emojiClick);
    this.domElement.appendChild(picker);
  }

  private emojiClick = (event: any) => {
    this.fireEvent("select", event.detail.unicode);
  };

  private _hide = (event: MouseEvent) => {
    if (!this.domElement.contains(event.target as Node)) {
      this.hide();
    }
  };

  public show(left: number, top: number) {
    this.showing = true;
    this.style({ left, top });
    setTimeout(() => this.onWindow("click", this._hide));
  }

  public hide() {
    this.showing = false;
    this.style({ left: -999999, top: -999999 });
    this.offWindow("click", this._hide);
  }

  public delete(): void {
    picker.removeEventListener("emoji-click", this.emojiClick);
    this.domElement.removeChild(picker);
    super.delete();
  }
}
