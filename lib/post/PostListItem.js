import SocialComponent from "../SocialComponent.js";
import PostThread from "./PostThread.js";
export default class PostListItem extends SocialComponent {
    constructor(posts, options, interactions) {
        super(".post-list-item");
        this.append(new PostThread(posts, options, interactions));
    }
}
//# sourceMappingURL=PostListItem.js.map