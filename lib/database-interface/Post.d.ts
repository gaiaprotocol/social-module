import { I18NText, Rich } from "common-app-module";
export declare enum PostTarget {
    EVERYONE = 0,
    KEY_HOLDERS = 1
}
export interface Author {
    user_id: string;
    display_name?: string;
    profile_image?: string;
    profile_image_thumbnail?: string;
    x_username?: string;
}
export default interface Post {
    id: number;
    guild_id?: number;
    target?: PostTarget;
    author: Author;
    message: string;
    translated?: I18NText;
    rich?: Rich;
    post_ref?: number;
    comment_count: number;
    repost_count: number;
    like_count: number;
    created_at: string;
    updated_at?: string;
}
export declare const PostSelectQuery = "*, author(user_id, display_name, profile_image, x_username)";
export declare const isEqualPost: (a: Post | undefined, b: Post | undefined) => boolean;
//# sourceMappingURL=Post.d.ts.map