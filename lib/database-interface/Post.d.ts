import { I18NText } from "common-app-module";
import { UploadedFile } from "./Rich.js";
export declare enum PostTarget {
    EVERYONE = 0,
    KEY_HOLDERS = 1
}
interface Author {
    display_name?: string;
    profile_image?: string;
    x_username?: string;
}
interface Rich {
    files?: UploadedFile[];
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
export declare const PostSelectQuery = "*, author(display_name, profile_image, x_username)";
export declare const isEqualPost: (a: Post | undefined, b: Post | undefined) => boolean;
export {};
//# sourceMappingURL=Post.d.ts.map