import SoFiComponent from "../SoFiComponent.js";
import PostDisplay from "./PostDisplay.js";
export default class PostThread extends SoFiComponent {
    postDisplays = [];
    constructor(posts, options, interactions, form) {
        super(".post-thread");
        this.addAllowedEvents("like", "unlike", "repost", "unrepost");
        let parent = true;
        for (const post of posts) {
            const postDisplay = new PostDisplay(post, {
                inView: options.inView && post.id === options.mainPostId,
                owner: options.signedUserId !== undefined &&
                    post.author.user_id === options.signedUserId,
                reposted: options.repostedPostIds.includes(post.id),
                liked: options.likedPostIds.includes(post.id),
                new: options.newPostIds.includes(post.id),
            }, interactions).appendTo(this);
            ["like", "unlike", "repost", "unrepost"].forEach((event) => postDisplay.on(event, () => this.fireEvent(event, post.id)));
            this.postDisplays.push(postDisplay);
            if (post.id === options.mainPostId) {
                parent = false;
                if (options.signedUserId && form) {
                    form.appendTo(this);
                }
            }
            if (parent)
                postDisplay.addClass("parent");
        }
    }
    findPostDisplay(postId) {
        return this.postDisplays.find((postDisplay) => postDisplay.post.id === postId);
    }
}
//# sourceMappingURL=PostThread.js.map