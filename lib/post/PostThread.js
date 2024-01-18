import SocialComponent from "../SocialComponent.js";
import PostDisplay from "./PostDisplay.js";
export default class PostThread extends SocialComponent {
    postService;
    options;
    interactions;
    form;
    constructor(posts, postService, options, interactions, form) {
        super(".post-thread");
        this.postService = postService;
        this.options = options;
        this.interactions = interactions;
        this.form = form;
        this.addAllowedEvents("like", "unlike", "repost", "unrepost");
        let parent = true;
        for (const post of posts) {
            const postDisplay = this.addPostDisplay(post);
            if (post.id === options.mainPostId) {
                parent = false;
                if (options.inView) {
                    this.on("visible", () => {
                        postDisplay.domElement.scrollIntoView();
                    });
                }
                if (options.signedUserId && form) {
                    form.appendTo(this);
                }
            }
            if (parent)
                postDisplay.addClass("parent");
        }
    }
    addPostDisplay(post, index) {
        const postDisplay = new PostDisplay(post, this.postService, {
            inView: this.options.inView && post.id === this.options.mainPostId,
            owner: this.options.signedUserId !== undefined &&
                post.author.user_id === this.options.signedUserId,
            reposted: this.options.repostedPostIds.includes(post.id),
            liked: this.options.likedPostIds.includes(post.id),
            new: this.options.newPostIds.includes(post.id),
        }, this.interactions).appendTo(this, index);
        ["like", "unlike", "repost", "unrepost"].forEach((event) => postDisplay.on(event, () => this.fireEvent(event, post.id)));
        return postDisplay;
    }
    addComment(post) {
        if (this.form) {
            const index = this.children.findIndex((child) => child === this.form);
            this.addPostDisplay(post, index + 1);
        }
    }
}
//# sourceMappingURL=PostThread.js.map