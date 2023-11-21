import { BodyNode, el, View } from "common-app-module";
import TestPostList from "./TestPostList.js";
export default class TestPostListView extends View {
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".test-post-list-view.test-view", new TestPostList()));
    }
}
//# sourceMappingURL=TestPostListView.js.map