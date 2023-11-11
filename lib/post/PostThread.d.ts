import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostForm from "./PostForm.js";
import PostInteractions from "./PostInteractions.js";
export default class PostThread extends SocialComponent {
    constructor(posts: Post[], options: {
        inView?: boolean;
        mainPostId: number;
        repostedPostIds: number[];
        likedPostIds: number[];
        newPostIds: number[];
        signedUserId?: string;
    }, interactions: PostInteractions, form?: PostForm);
}
//# sourceMappingURL=PostThread.d.ts.map