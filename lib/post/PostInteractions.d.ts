import { DomNode } from "@common-module/app";
import Author from "../database-interface/Author.js";
import Post from "../database-interface/Post.js";
export default interface PostInteractions<T extends Post> {
    openAuthorProfile: (author: Author) => void;
    openOwnerMenu: (postId: number, rect: DOMRect) => void;
    openPostView: (post: T) => void;
    openCommentPopup: (post: T) => void;
    displayTarget: (post: T) => DomNode;
}
//# sourceMappingURL=PostInteractions.d.ts.map