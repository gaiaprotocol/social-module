import Post from "../database-interface/Post.js";
import SoFiComponent from "../SoFiComponent.js";
import PostInteractions from "./PostInteractions.js";
export default class PostDisplay<T extends Post> extends SoFiComponent {
    post: T;
    private interactions;
    private reposted;
    private liked;
    private repostCountDisplay;
    private likeCountDisplay;
    constructor(post: T, options: {
        inView?: boolean;
        owner: boolean;
        reposted: boolean;
        liked: boolean;
        new: boolean;
    }, interactions: PostInteractions<T>);
    private goAuthorProfile;
    private openOwnerMenu;
    private openCommentPopup;
    private repost;
    private like;
}
//# sourceMappingURL=PostDisplay.d.ts.map