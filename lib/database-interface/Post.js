import { isEqualMessage, MessageSelectQuery } from "./Message.js";
export const PostSelectQuery = MessageSelectQuery;
export const isEqualPost = (a, b) => isEqualMessage(a, b) &&
    (a.parent ?? undefined) === (b.parent ?? undefined) &&
    a.comment_count === b.comment_count &&
    a.repost_count === b.repost_count &&
    a.like_count === b.like_count;
//# sourceMappingURL=Post.js.map