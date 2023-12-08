import Author from "../database-interface/Author.js";
import Post from "../database-interface/Post.js";
export default interface PostInteractions<T extends Post> {
    openPostView: (post: T) => void;
    openAuthorProfile: (author: Author) => void;
    openOwnerMenu: (postId: number, rect: DOMRect) => void;
    openCommentPopup: (post: T) => void;
}
//# sourceMappingURL=PostInteractions.d.ts.map