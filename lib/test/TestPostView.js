import { BodyNode, el, View } from "@common-module/app";
export default class TestPostView extends View {
    constructor(params) {
        super();
        BodyNode.append(this.container = el(".test-post-view.test-view"));
    }
}
//# sourceMappingURL=TestPostView.js.map