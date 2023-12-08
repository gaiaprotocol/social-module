import SoFiComponent from "../SoFiComponent.js";
import Post from "../database-interface/Post.js";
export default class PostContentDisplay<T extends Post> extends SoFiComponent {
    post: T;
    constructor(post: T);
}
//# sourceMappingURL=PostContentDisplay.d.ts.map