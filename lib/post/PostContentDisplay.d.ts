import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
export default class PostContentDisplay<T extends Post> extends SocialComponent {
    post: T;
    constructor(post: T);
}
//# sourceMappingURL=PostContentDisplay.d.ts.map