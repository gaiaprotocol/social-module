import { BrowserInfo, DomNode, el, View } from "@common-module/app";
import ChatMessageList from "./ChatMessageList.js";

export default abstract class ChatRoomView<ST> extends View {
  constructor(Layout: { append(node: DomNode): void }, tag: string) {
    super();
    Layout.append(this.container = el(tag + ".chat-room-view"));

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", this.setViewportHeight);
    }
  }

  protected abstract messageList: ChatMessageList<ST>;

  private setViewportHeight = () => {
    if (BrowserInfo.isPhoneSize && window.visualViewport) {
      this.container.style({
        top: `${window.visualViewport.offsetTop}px`,
        height: `${window.visualViewport.height}px`,
      });
      this.messageList.scrollToBottom();
    }
  };

  public close(): void {
    if (window.visualViewport) {
      window.visualViewport.removeEventListener(
        "resize",
        this.setViewportHeight,
      );
    }
    super.close();
  }
}
