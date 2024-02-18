import { DomNode, View } from "@common-module/app";
import ChatMessageList from "./ChatMessageList.js";
export default abstract class ChatRoomView<ST> extends View {
    constructor(Layout: {
        append(node: DomNode): void;
    }, tag: string);
    protected abstract messageList: ChatMessageList<ST>;
    private setViewportHeight;
    close(): void;
}
//# sourceMappingURL=ChatRoomView.d.ts.map