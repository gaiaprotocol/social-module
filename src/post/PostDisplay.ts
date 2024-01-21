import { DateUtil, DomNode, el, Icon, RichDisplay } from "@common-module/app";
import Post from "../database-interface/Post.js";
import SocialComponent from "../SocialComponent.js";
import AvatarUtil from "../util/AvatarUtil.js";
import PostInteractions from "./PostInteractions.js";
import PostService from "./PostService.js";

// Displays a single Post.
export default class PostDisplay<T extends Post> extends SocialComponent {
  private reposted: boolean;
  private liked: boolean;

  private repostCountDisplay: DomNode;
  private likeCountDisplay: DomNode;

  constructor(
    public post: T,
    private postService: PostService<T>,
    options: {
      inView?: boolean;
      owner: boolean;
      reposted: boolean;
      liked: boolean;
      new: boolean;
    },
    private interactions: PostInteractions<T>,
  ) {
    super(
      ".post-display" +
        (options.inView ? ".in-view" : "") +
        (options.new ? ".new" : ""),
    );
    this.reposted = options.reposted;
    this.liked = options.liked;

    this.addAllowedEvents("like", "unlike", "repost", "unrepost");

    const authorAvatar = el(".author-avatar", {
      click: (event) => this.goAuthorProfile(event),
    });

    AvatarUtil.selectLoadable(authorAvatar, [
      post.author.avatar_thumb,
      post.author.stored_avatar_thumb,
    ]);

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
        el("header", authorAvatar, authorDisplay, ownerMenuButton),
        messageDisplay,
        richDisplay,
        dateDisplay,
        actions,
      );
    } else {
      this.append(
        authorAvatar,
        el(
          "main",
          el("header", authorDisplay, ownerMenuButton),
          messageDisplay,
          richDisplay,
          dateDisplay,
          actions,
        ),
      ).onDom("click", () => interactions.openPostView(post));
    }

    this.onDelegate(postService, "deleteMessage", () => this.delete());
  }

  private goAuthorProfile(event: MouseEvent) {
    event.stopPropagation();
    this.interactions.openAuthorProfile(this.post.author);
  }

  private openOwnerMenu(event: MouseEvent, button: DomNode) {
    event.stopPropagation();
    this.interactions.openOwnerMenu(this.post.id, button.rect);
  }

  private openCommentPopup(event: MouseEvent) {
    event.stopPropagation();
    this.interactions.openCommentPopup(this.post);
  }

  private repost(event: MouseEvent, button: DomNode) {
    event.stopPropagation();
    this.postService.checkSigned();

    if (!this.reposted) {
      this.postService.repost(this.post.id);
      this.repostCountDisplay.text = String(this.post.repost_count += 1);
      this.reposted = true;
      button.addClass("reposted");
      this.fireEvent("repost");
    } else {
      this.postService.unrepost(this.post.id);
      this.repostCountDisplay.text = String(this.post.repost_count -= 1);
      this.reposted = false;
      button.deleteClass("reposted");
      this.fireEvent("unrepost");
    }
  }

  private like(event: MouseEvent, button: DomNode) {
    event.stopPropagation();
    this.postService.checkSigned();

    if (!this.liked) {
      this.postService.like(this.post.id);
      this.likeCountDisplay.text = String(this.post.like_count += 1);
      this.liked = true;
      button.addClass("liked");
      this.fireEvent("like");
    } else {
      this.postService.unlike(this.post.id);
      this.likeCountDisplay.text = String(this.post.like_count -= 1);
      this.liked = false;
      button.deleteClass("liked");
      this.fireEvent("unlike");
    }
  }
}
