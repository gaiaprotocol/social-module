import { BodyNode, el, View, ViewParams } from "@common-module/app";
import TestPostList from "./TestPostList.js";

export default class TestPostListView extends View {
  constructor(params: ViewParams) {
    super();
    BodyNode.append(
      this.container = el(
        ".test-post-list-view.test-view",
        new TestPostList(),
      ),
    );
  }
}
