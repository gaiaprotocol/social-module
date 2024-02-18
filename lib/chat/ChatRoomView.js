import { BrowserInfo, el, View } from "@common-module/app";
export default class ChatRoomView extends View {
    constructor(Layout, tag) {
        super();
        Layout.append(this.container = el(tag + ".chat-room-view"));
        if (window.visualViewport) {
            window.visualViewport.addEventListener("resize", this.setViewportHeight);
        }
    }
    setViewportHeight = () => {
        if (BrowserInfo.isPhoneSize && window.visualViewport) {
            this.container.style({
                top: `${window.visualViewport.offsetTop}px`,
                height: `${window.visualViewport.height}px`,
            });
            this.messageList.scrollToBottom();
        }
    };
    close() {
        if (window.visualViewport) {
            window.visualViewport.removeEventListener("resize", this.setViewportHeight);
        }
        super.close();
    }
}
//# sourceMappingURL=ChatRoomView.js.map