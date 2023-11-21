import ChatMessageList from "../chat/ChatMessageList.js";
import Post from "../database-interface/Post.js";
export default class TestChatMessageList extends ChatMessageList {
    constructor();
    protected fetchPosts(): Promise<{
        fetchedPosts: {
            posts: Post[];
            mainPostId: number;
        }[];
        repostedPostIds: number[];
        likedPostIds: number[];
    }>;
}
//# sourceMappingURL=TestChatList.d.ts.map