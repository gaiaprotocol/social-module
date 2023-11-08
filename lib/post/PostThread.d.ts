import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
export default class PostThread extends SocialComponent {
    constructor(posts: Post[], options: {
        mainPostId: number;
        repostedPostIds: number[];
        likedPostIds: number[];
        signedUserId: string;
    }, interactions: PostInteractions);
}
//# sourceMappingURL=PostThread.d.ts.map