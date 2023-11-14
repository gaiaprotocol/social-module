import { DateUtil, el, Icon, RichDisplay } from "common-app-module";
import SocialComponent from "../SocialComponent.js";
export default class PostDisplay extends SocialComponent {
    post;
    interactions;
    reposted;
    liked;
    repostCountDisplay;
    likeCountDisplay;
    constructor(post, options, interactions) {
        super(".post-display" +
            (options.inView ? ".in-view" : "") +
            (options.new ? ".new" : ""));
        this.post = post;
        this.interactions = interactions;
        this.reposted = options.reposted;
        this.liked = options.liked;
        const authorProfileImage = el(".author-profile-image", {
            style: {
                backgroundImage: `url(${post.author.profile_image_thumbnail})`,
            },
            click: options.inView
                ? (event) => this.goAuthorProfile(event)
                : undefined,
        });
        const authorDisplay = el(".author", el(".name", post.author.display_name, {
            click: (event) => this.goAuthorProfile(event),
        }), post.author.x_username
            ? el(".x-username", `@${post.author.x_username}`, {
                click: (event) => this.goAuthorProfile(event),
            })
            : undefined);
        const ownerMenuButton = options.owner
            ? el("button.owner-menu", new Icon("section-menu"), {
                click: (event, button) => this.openOwnerMenu(event, button),
            })
            : undefined;
        const messageDisplay = el(".message", post.message);
        const richDisplay = post.rich ? new RichDisplay(post.rich) : undefined;
        const dateDisplay = el(".date", DateUtil.fromNow(post.created_at));
        const actions = el(".actions", el("button.comment", new Icon("comment"), String(post.comment_count), { click: (event) => this.openCommentPopup(event) }), el("button.repost" + (this.reposted ? ".reposted" : ""), new Icon("repeat"), this.repostCountDisplay = el("span", String(post.repost_count)), { click: (event, button) => this.repost(event, button) }), el("button.like" + (this.liked ? ".liked" : ""), new Icon("like"), this.likeCountDisplay = el("span", String(post.like_count)), { click: (event, button) => this.like(event, button) }));
        if (options.inView) {
            this.append(el("header", authorProfileImage, authorDisplay, ownerMenuButton), messageDisplay, richDisplay, dateDisplay, actions);
        }
        else {
            this.append(authorProfileImage, el("main", el("header", authorDisplay, ownerMenuButton), messageDisplay, richDisplay, dateDisplay, actions));
        }
    }
    goAuthorProfile(event) {
        event.stopPropagation();
        this.interactions.openAuthorProfile?.(this.post.author);
    }
    openOwnerMenu(event, button) {
        event.stopPropagation();
        this.interactions.openOwnerMenu(this.post.id, button.rect);
    }
    openCommentPopup(event) {
        event.stopPropagation();
        this.interactions.openCommentPopup(this.post);
    }
    repost(event, button) {
        event.stopPropagation();
        if (!this.reposted) {
            this.interactions.repost(this.post.id);
            this.repostCountDisplay.text = String(this.post.repost_count + 1);
            this.reposted = true;
            button.addClass("reposted");
        }
        else {
            this.interactions.unrepost(this.post.id);
            this.repostCountDisplay.text = String(this.post.repost_count - 1);
            this.reposted = false;
            button.deleteClass("reposted");
        }
    }
    like(event, button) {
        event.stopPropagation();
        if (!this.liked) {
            this.interactions.like(this.post.id);
            this.likeCountDisplay.text = String(this.post.like_count + 1);
            this.liked = true;
            button.addClass("liked");
        }
        else {
            this.interactions.unlike(this.post.id);
            this.likeCountDisplay.text = String(this.post.like_count - 1);
            this.liked = false;
            button.deleteClass("liked");
        }
    }
}
//# sourceMappingURL=PostDisplay.js.map