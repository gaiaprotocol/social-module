import Message from "./Message.js";
export default interface Post extends Message {
    parent?: number;
    comment_count: number;
    repost_count: number;
    like_count: number;
}
export declare const PostSelectQuery = "*, author(user_id, display_name, profile_image, profile_image_thumbnail, x_username)";
//# sourceMappingURL=Post.d.ts.map