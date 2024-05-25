import { Picker } from "emoji-picker-element";
import SocialComponent from "../SocialComponent.js";

export default class EmojiPicker extends SocialComponent {
  public showing: boolean = false;
  private picker = new Picker();

  constructor() {
    super(".emoji-picker");
    this.addAllowedEvents("select");

    this.picker.addEventListener("emoji-click", this.emojiClick);
    this.domElement.appendChild(this.picker);
  }

  private emojiClick = (event: any) => {
    this.emit("select", event.detail.unicode);
  };

  private _hide = (event: MouseEvent) => {
    if (!this.domElement.contains(event.target as Node)) {
      this.hide();
    }
  };

  public show(left: number, top: number) {
    const rect = this.rect;
    if (left < 8) left = 8;
    else if (left + rect.width > window.innerWidth - 8) {
      left = window.innerWidth - rect.width - 8;
    }
    if (top < 8) top = 8;
    else if (top + rect.height > window.innerHeight - 8) {
      top = window.innerHeight - rect.height - 8;
    }

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
    this.picker.removeEventListener("emoji-click", this.emojiClick);
    this.domElement.removeChild(this.picker);
    super.delete();
  }
}
