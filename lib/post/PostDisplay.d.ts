import Post from "../database-interface/Post.js";
import SocialComponent from "../SocialComponent.js";
export default class PostDisplay extends SocialComponent {
    private post;
    private options;
    private reposted;
    private liked;
    private repostCountDisplay;
    private likeCountDisplay;
    constructor(post: Post, options: {
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
    });
    private goAuthorProfile;
    private openOwnerMenu;
    private openCommentPopup;
    private repost;
    private like;
}
//# sourceMappingURL=PostDisplay.d.ts.map