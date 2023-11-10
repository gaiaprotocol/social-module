import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
export default class PostListItem extends SocialComponent {
    constructor(posts: Post[], options: {
        mainPostId: number;
        repostedPostIds: number[];
        likedPostIds: number[];
        newPostIds: number[];
        signedUserId?: string;
    }, interactions: PostInteractions);
}
//# sourceMappingURL=PostListItem.d.ts.map