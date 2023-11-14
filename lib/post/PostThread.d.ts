import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostForm from "./PostForm.js";
import PostInteractions from "./PostInteractions.js";
export default class PostThread<T extends Post> extends SocialComponent {
    constructor(posts: T[], options: {
        inView?: boolean;
        mainPostId: number;
        repostedPostIds: number[];
        likedPostIds: number[];
        newPostIds: number[];
        signedUserId?: string;
    }, interactions: PostInteractions<T>, form?: PostForm);
}
//# sourceMappingURL=PostThread.d.ts.map