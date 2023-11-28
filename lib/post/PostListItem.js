import SoFiComponent from "../SoFiComponent.js";
import PostThread from "./PostThread.js";
export default class PostListItem extends SoFiComponent {
    constructor(posts, options, interactions) {
        super(".post-list-item");
        this.addAllowedEvents("like", "unlike", "repost", "unrepost");
        const thread = new PostThread(posts, options, interactions).appendTo(this);
        ["like", "unlike", "repost", "unrepost"].forEach((event) => thread.on(event, (postId) => this.fireEvent(event, postId)));
    }
}
//# sourceMappingURL=PostListItem.js.map