import SoFiComponent from "../SoFiComponent.js";
import PostThread from "./PostThread.js";
export default class PostListItem extends SoFiComponent {
    constructor(posts, options, interactions) {
        super(".post-list-item");
        this.append(new PostThread(posts, options, interactions));
    }
}
//# sourceMappingURL=PostListItem.js.map