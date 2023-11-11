import { DomNode } from "common-app-module";
import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
import PostService from "./PostService.js";
export default abstract class PostList<T extends Post> extends SocialComponent {
    protected postService: PostService<T>;
    private options;
    private interactions;
    private store;
    private refreshed;
    protected lastPostId: number | undefined;
    constructor(tag: string, postService: PostService<T>, options: {
        storeName: string;
        signedUserId?: string;
        emptyMessage: string;
        wait?: boolean;
    }, interactions: PostInteractions, loadingAnimation: DomNode);
    private addPostItem;
    protected abstract fetchPosts(): Promise<{
        posts: Post[];
        mainPostId: number;
    }[]>;
    private _fetchPosts;
    private refresh;
    private loadMore;
    show(): void;
    hide(): void;
}
//# sourceMappingURL=PostList.d.ts.map