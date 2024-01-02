import { el } from "@common-module/app";
import SoFiComponent from "../SoFiComponent.js";
import AuthorUtil from "../util/AuthorUtil.js";
export default class PostContentDisplay extends SoFiComponent {
    post;
    constructor(post) {
        super(".post-content-display");
        this.post = post;
        const authorProfileImage = el(".author-profile-image");
        AuthorUtil.selectLoadableAvatar(authorProfileImage, [
            post.author.avatar_thumb,
            post.author.stored_avatar_thumb,
        ]);
        const authorDisplay = el(".author", el(".name", post.author.display_name), post.author.x_username
            ? el(".x-username", `@${post.author.x_username}`)
            : undefined);
        const messageDisplay = el(".message", post.message);
        this.append(authorProfileImage, el("main", el("header", authorDisplay), messageDisplay));
    }
}
//# sourceMappingURL=PostContentDisplay.js.map