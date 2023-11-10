import Author from "../database-interface/Author.js";

export default interface PostInteractions {
  openAuthorProfile: (author: Author) => void;
  openOwnerMenu: (postId: number, rect: DOMRect) => void;
  openCommentPopup: (postId: number) => void;

  repost: (postId: number) => void;
  unrepost: (postId: number) => void;
  like: (postId: number) => void;
  unlike: (postId: number) => void;
}
