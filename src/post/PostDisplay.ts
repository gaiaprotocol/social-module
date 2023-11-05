import { el, Router } from "common-app-module";
import SocialComponent from "../SocialComponent.js";

// Displays a single Post.
export default class PostDisplay extends SocialComponent {
  /*constructor(
    private options: {
      inView?: boolean;
      goAuthorProfile?: (author: Author) => void;
    },
  ) {
    super(".post-display" + (options.inView ? ".in-view" : ""));

    el(".author-profile-image", {
      style: { backgroundImage: `url(${this.post.author.profile_image})` },
      click: options.inView
        ? (event) => this.goAuthorProfile(event)
        : undefined,
    });

    if (options.inView) {
      this.append(el("header"));
    } else {
      this.append();
    }
  }

  private goAuthorProfile(event: MouseEvent) {
    event.stopPropagation();
    Router.go(`/${this.post.author.x_username}`);
  }*/
}
