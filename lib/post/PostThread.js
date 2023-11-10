import SocialComponent from "../SocialComponent.js";
import PostDisplay from "./PostDisplay.js";
export default class PostThread extends SocialComponent {
    constructor(posts, options, interactions, form) {
        super(".post-thread");
        let mainPostDisplay;
        for (const post of posts) {
            const postDisplay = new PostDisplay(post, {
                inView: post.id === options.mainPostId,
                owner: options.signedUserId !== undefined &&
                    post.author.user_id === options.signedUserId,
                reposted: options.repostedPostIds.includes(post.id),
                liked: options.likedPostIds.includes(post.id),
                new: options.newPostIds.includes(post.id),
            }, interactions).appendTo(this);
            if (post.comment_count > 0) {
                postDisplay.addClass("has-comments");
            }
            if (post.id === options.mainPostId) {
                mainPostDisplay = postDisplay;
                if (options.signedUserId && form) {
                    form.appendTo(this);
                }
            }
        }
        if (mainPostDisplay) {
            mainPostDisplay.domElement.scrollIntoView();
        }
    }
}
//# sourceMappingURL=PostThread.js.map