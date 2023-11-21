import { BodyNode, el, View, ViewParams } from "common-app-module";
import TestChatMessageList from "./TestChatMessageList.js";

export default class TestChatView extends View {
  constructor(params: ViewParams) {
    super();
    BodyNode.append(
      this.container = el(
        ".test-chat-view.test-view",
        new TestChatMessageList(),
      ),
    );
  }
}
