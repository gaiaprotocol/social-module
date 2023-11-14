import { DomNode } from "common-app-module";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
import PostList from "./PostList.js";
import PostService from "./PostService.js";
export default class FollowingPostList<T extends Post> extends PostList<T> {
    constructor(postService: PostService<T>, options: {
        signedUserId: string;
        wait?: boolean;
    }, interactions: PostInteractions<T>, loadingAnimation: DomNode);
    protected fetchPosts(): Promise<{
        posts: T[];
        mainPostId: number;
    }[]>;
}
//# sourceMappingURL=FollowingPostList.d.ts.map