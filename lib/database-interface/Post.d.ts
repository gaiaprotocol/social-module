import Author from "./Author.js";
import Message from "./Message.js";
export default interface Post extends Message {
    parent?: number;
    target_details?: any;
    author: Author;
    comment_count: number;
    repost_count: number;
    like_count: number;
}
export declare const PostSelectQuery = "*, author(user_id, display_name, avatar, avatar_thumb, stored_avatar, stored_avatar_thumb, x_username)";
//# sourceMappingURL=Post.d.ts.map