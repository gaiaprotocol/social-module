import Post from "../database-interface/Post.js";
import SocialComponent from "../SocialComponent.js";
import PostInteractions from "./PostInteractions.js";
export default class PostDisplay extends SocialComponent {
    private post;
    private interactions;
    private reposted;
    private liked;
    private repostCountDisplay;
    private likeCountDisplay;
    constructor(post: Post, options: {
        inView?: boolean;
        owner: boolean;
        reposted: boolean;
        liked: boolean;
        new: boolean;
    }, interactions: PostInteractions);
    private goAuthorProfile;
    private openOwnerMenu;
    private openCommentPopup;
    private repost;
    private like;
}
//# sourceMappingURL=PostDisplay.d.ts.map