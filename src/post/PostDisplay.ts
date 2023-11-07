import { DateUtil, DomNode, el, Icon, RichDisplay } from "common-app-module";
import Post from "../database-interface/Post.js";
import SocialComponent from "../SocialComponent.js";

// Displays a single Post.
export default class PostDisplay extends SocialComponent {
  private reposted: boolean;
  private liked: boolean;

  private repostCountDisplay: DomNode;
  private likeCountDisplay: DomNode;

  constructor(
    private post: Post,
    private options: {
      inView?: boolean;
      owner?: boolean;
      reposted?: boolean;
      liked?: boolean;

      openAuthorProfile: () => void;
      openOwnerMenu: (rect: DOMRect) => void;
      openCommentPopup: () => void;

      repost: () => void;
      unrepost: () => void;
      like: () => void;
      unlike: () => void;
    },
  ) {
    super(".post-display" + (options.inView ? ".in-view" : ""));
    this.reposted = options.reposted ?? false;
    this.liked = options.liked ?? false;

    const authorProfileImage = el(".author-profile-image", {
      style: {
        backgroundImage: `url(${
          post.author.profile_image_thumbnail ?? post.author.profile_image
        })`,
      },
      click: options.inView
        ? (event) => this.goAuthorProfile(event)
        : undefined,
    });

    const authorDisplay = el(
      ".author",
      el(".name", post.author.display_name, {
        click: (event) => this.goAuthorProfile(event),
      }),
      post.author.x_username
        ? el(".x-username", `@${post.author.x_username}`, {
          click: (event) => this.goAuthorProfile(event),
        })
        : undefined,
    );

    const ownerMenuButton = options.owner
      ? el("button.owner-menu", new Icon("section-menu"), {
        click: (event, button) => this.openOwnerMenu(event, button),
      })
      : undefined;

    const messageDisplay = el(".message", post.message);
    const richDisplay = post.rich ? new RichDisplay(post.rich) : undefined;
    const dateDisplay = el(".date", DateUtil.fromNow(post.created_at));

    const actions = el(
      ".actions",
      el(
        "button.comment",
        new Icon("comment"),
        String(post.comment_count),
        { click: (event) => this.openCommentPopup(event) },
      ),
      el(
        "button.repost" + (this.reposted ? ".reposted" : ""),
        new Icon("repeat"),
        this.repostCountDisplay = el("span", String(post.repost_count)),
        { click: (event, button) => this.repost(event, button) },
      ),
      el(
        "button.like" + (this.liked ? ".liked" : ""),
        new Icon("like"),
        this.likeCountDisplay = el("span", String(post.like_count)),
        { click: (event, button) => this.like(event, button) },
      ),
    );

    if (options.inView) {
      this.append(
        el(
          "header",
          authorProfileImage,
          authorDisplay,
          ownerMenuButton,
        ),
        messageDisplay,
        richDisplay,
        dateDisplay,
        actions,
      );
    } else {
      this.append(
        authorProfileImage,
        el(
          "main",
          el("header", authorDisplay, ownerMenuButton),
          messageDisplay,
          richDisplay,
          dateDisplay,
          actions,
        ),
      );
    }
  }

  private goAuthorProfile(event: MouseEvent) {
    event.stopPropagation();
    this.options.openAuthorProfile?.();
  }

  private openOwnerMenu(event: MouseEvent, button: DomNode) {
    event.stopPropagation();
    this.options.openOwnerMenu(button.rect);
  }

  private openCommentPopup(event: MouseEvent) {
    event.stopPropagation();
    this.options.openCommentPopup();
  }

  private repost(event: MouseEvent, button: DomNode) {
    event.stopPropagation();
    if (!this.reposted) {
      this.options.repost();
      this.repostCountDisplay.text = String(this.post.repost_count + 1);
      this.reposted = true;
      button.addClass("reposted");
    } else {
      this.options.unrepost();
      this.repostCountDisplay.text = String(this.post.repost_count - 1);
      this.reposted = false;
      button.deleteClass("reposted");
    }
  }

  private like(event: MouseEvent, button: DomNode) {
    event.stopPropagation();
    if (!this.liked) {
      this.options.like();
      this.likeCountDisplay.text = String(this.post.like_count + 1);
      this.liked = true;
      button.addClass("liked");
    } else {
      this.options.unlike();
      this.likeCountDisplay.text = String(this.post.like_count - 1);
      this.liked = false;
      button.deleteClass("liked");
    }
  }
}
