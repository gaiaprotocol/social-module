import { AvatarUtil, el } from "@common-module/app";
import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";

export default class PostContentDisplay<T extends Post>
  extends SocialComponent {
  constructor(public post: T) {
    super(".post-content-display");

    const authorAvatar = el(".author-avatar");

    AvatarUtil.selectLoadable(authorAvatar, [
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
      authorAvatar,
      el(
        "main",
        el("header", authorDisplay),
        messageDisplay,
      ),
    );
  }
}
