import { DateUtil, el, Icon, RichDisplay } from "@common-module/app";
import SoFiComponent from "../SoFiComponent.js";
import AvatarUtil from "../util/AvatarUtil.js";
export default class PostDisplay extends SoFiComponent {
    post;
    postService;
    interactions;
    reposted;
    liked;
    repostCountDisplay;
    likeCountDisplay;
    constructor(post, postService, options, interactions) {
        super(".post-display" +
            (options.inView ? ".in-view" : "") +
            (options.new ? ".new" : ""));
        this.post = post;
        this.postService = postService;
        this.interactions = interactions;
        this.reposted = options.reposted;
        this.liked = options.liked;
        this.addAllowedEvents("like", "unlike", "repost", "unrepost");
        const authorProfileImage = el(".author-profile-image", {
            click: (event) => this.goAuthorProfile(event),
        });
        AvatarUtil.selectLoadable(authorProfileImage, [
            post.author.avatar_thumb,
            post.author.stored_avatar_thumb,
        ]);
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
            this.append(authorProfileImage, el("main", el("header", authorDisplay, ownerMenuButton), messageDisplay, richDisplay, dateDisplay, actions)).onDom("click", () => interactions.openPostView(post));
        }
        this.onDelegate(postService, "deleteMessage", () => this.delete());
    }
    goAuthorProfile(event) {
        event.stopPropagation();
        this.interactions.openAuthorProfile(this.post.author);
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
        this.postService.checkSigned();
        if (!this.reposted) {
            this.postService.repost(this.post.id);
            this.repostCountDisplay.text = String(this.post.repost_count += 1);
            this.reposted = true;
            button.addClass("reposted");
            this.fireEvent("repost");
        }
        else {
            this.postService.unrepost(this.post.id);
            this.repostCountDisplay.text = String(this.post.repost_count -= 1);
            this.reposted = false;
            button.deleteClass("reposted");
            this.fireEvent("unrepost");
        }
    }
    like(event, button) {
        event.stopPropagation();
        this.postService.checkSigned();
        if (!this.liked) {
            this.postService.like(this.post.id);
            this.likeCountDisplay.text = String(this.post.like_count += 1);
            this.liked = true;
            button.addClass("liked");
            this.fireEvent("like");
        }
        else {
            this.postService.unlike(this.post.id);
            this.likeCountDisplay.text = String(this.post.like_count -= 1);
            this.liked = false;
            button.deleteClass("liked");
            this.fireEvent("unlike");
        }
    }
}
//# sourceMappingURL=PostDisplay.js.map