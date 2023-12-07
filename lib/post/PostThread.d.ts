import SoFiComponent from "../SoFiComponent.js";
import Post from "../database-interface/Post.js";
import PostForm from "./PostForm.js";
import PostInteractions from "./PostInteractions.js";
export default class PostThread<T extends Post> extends SoFiComponent {
    private options;
    private interactions;
    private form?;
    constructor(posts: T[], options: {
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