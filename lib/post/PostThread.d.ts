import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostForm from "./PostForm.js";
import PostInteractions from "./PostInteractions.js";
import PostService from "./PostService.js";
export default class PostThread<T extends Post> extends SocialComponent {
    private postService;
    private options;
    private interactions;
    private form?;
    constructor(posts: T[], postService: PostService<T>, options: {
        inView?: boolean;
        mainPostId: number;
        repostedPostIds: number[];
        likedPostIds: number[];
        newPostIds: number[];
        signedUserId?: string;
    }, interactions: PostInteractions<T>, form?: PostForm | undefined);
    private addPostDisplay;
    addComment(post: T): void;
}
//# sourceMappingURL=PostThread.d.ts.map