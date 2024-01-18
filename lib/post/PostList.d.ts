import { DomChild } from "@common-module/app/lib/dom/DomNode.js";
import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
import PostService from "./PostService.js";
export default abstract class PostList<T extends Post> extends SocialComponent {
    protected postService: PostService<T>;
    protected options: {
        storeName?: string;
        signedUserId?: string;
        emptyMessage: string;
    };
    private interactions;
    private store;
    private refreshed;
    protected lastPostId: number | undefined;
    constructor(tag: string, postService: PostService<T>, options: {
        storeName?: string;
        signedUserId?: string;
        emptyMessage: string;
    }, interactions: PostInteractions<T>, initialLoadingAnimation: DomChild);
    protected abstract fetchPosts(): Promise<{
        fetchedPosts: {
            posts: T[];
            mainPostId: number;
        }[];
        repostedPostIds: number[];
        likedPostIds: number[];
    }>;
    private addPostItem;
    protected refresh(): Promise<void>;
    protected addNewPost(post: T): void;
    private loadMore;
    show(): void;
    hide(): void;
}
//# sourceMappingURL=PostList.d.ts.map