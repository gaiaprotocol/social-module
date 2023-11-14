import SocialComponent from "../SocialComponent.js";
import PostDisplay from "./PostDisplay.js";
export default class PostThread extends SocialComponent {
    constructor(posts, options, interactions, form) {
        super(".post-thread");
        let parent = true;
        let mainPostDisplay;
        for (const post of posts) {
            const postDisplay = new PostDisplay(post, {
                inView: options.inView && post.id === options.mainPostId,
                owner: options.signedUserId !== undefined &&
                    post.author.user_id === options.signedUserId,
                reposted: options.repostedPostIds.includes(post.id),
                liked: options.likedPostIds.includes(post.id),
                new: options.newPostIds.includes(post.id),
            }, interactions).appendTo(this);
            if (post.id === options.mainPostId) {
                mainPostDisplay = postDisplay;
                parent = false;
                if (options.signedUserId && form) {
                    form.appendTo(this);
                }
            }
            if (parent)
                postDisplay.addClass("parent");
        }
        if (mainPostDisplay) {
            this.on("visible", () => mainPostDisplay.domElement.scrollIntoView());
        }
    }
}
//# sourceMappingURL=PostThread.js.map