import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostDisplay from "./PostDisplay.js";
import PostForm from "./PostForm.js";
import PostInteractions from "./PostInteractions.js";
export default class PostThread<T extends Post> extends SocialComponent {
    private postDisplays;
    constructor(posts: T[], options: {
        inView?: boolean;
        mainPostId: number;
        repostedPostIds: number[];
        likedPostIds: number[];
        newPostIds: number[];
        signedUserId?: string;
    }, interactions: PostInteractions<T>, form?: PostForm);
    findPostDisplay(postId: number): PostDisplay<T> | undefined;
}
//# sourceMappingURL=PostThread.d.ts.map