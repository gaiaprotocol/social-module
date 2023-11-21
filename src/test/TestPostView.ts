import { BodyNode, el, View, ViewParams } from "common-app-module";

export default class TestPostView extends View {
  constructor(params: ViewParams) {
    super();
    BodyNode.append(
      this.container = el(
        ".test-post-view.test-view",
      ),
    );
  }
}
