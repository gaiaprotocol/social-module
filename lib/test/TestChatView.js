import { BodyNode, el, View } from "common-app-module";
export default class TestChatView extends View {
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".test-chat-view.test-view"));
    }
}
//# sourceMappingURL=TestChatView.js.map