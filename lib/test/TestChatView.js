import { BodyNode, el, View } from "common-app-module";
import TestChatMessageList from "./TestChatMessageList.js";
export default class TestChatView extends View {
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".test-chat-view.test-view", new TestChatMessageList()));
    }
}
//# sourceMappingURL=TestChatView.js.map