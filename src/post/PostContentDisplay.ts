import { el } from "common-app-module";
import SoFiComponent from "../SoFiComponent.js";
import Post from "../database-interface/Post.js";
import AuthorUtil from "../util/AuthorUtil.js";

export default class PostContentDisplay<T extends Post> extends SoFiComponent {
  constructor(public post: T) {
    super(".post-content-display");

    const authorProfileImage = el(".author-profile-image");

    AuthorUtil.selectLoadableAvatar(authorProfileImage, [
      post.author.avatar_thumb,
      post.author.stored_avatar_thumb,
    ]);

    const authorDisplay = el(
      ".author",
      el(".name", post.author.display_name),
      post.author.x_username
        ? el(".x-username", `@${post.author.x_username}`)
        : undefined,
    );

    const messageDisplay = el(".message", post.message);

    this.append(
      authorProfileImage,
      el(
        "main",
        el("header", authorDisplay),
        messageDisplay,
      ),
    );
  }
}
