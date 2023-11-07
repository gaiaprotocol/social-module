import { isEqualRich } from "common-app-module";
export var PostTarget;
(function (PostTarget) {
    PostTarget[PostTarget["EVERYONE"] = 0] = "EVERYONE";
    PostTarget[PostTarget["KEY_HOLDERS"] = 1] = "KEY_HOLDERS";
})(PostTarget || (PostTarget = {}));
export const PostSelectQuery = "*, author(user_id, display_name, profile_image, x_username)";
const isEqualAuthor = (a, b) => (a.display_name ?? undefined) === (b.display_name ?? undefined) &&
    (a.profile_image ?? undefined) === (b.profile_image ?? undefined) &&
    (a.x_username ?? undefined) === (b.x_username ?? undefined);
export const isEqualPost = (a, b) => a?.id == b?.id &&
    a?.guild_id == b?.guild_id &&
    a?.target == b?.target &&
    isEqualAuthor(a?.author ?? { user_id: "" }, b?.author ?? { user_id: "" }) &&
    a?.message == b?.message &&
    isEqualRich(a?.rich ?? {}, b?.rich ?? {}) &&
    a?.post_ref == b?.post_ref &&
    a?.comment_count == b?.comment_count &&
    a?.repost_count == b?.repost_count &&
    a?.like_count == b?.like_count;
//# sourceMappingURL=Post.js.map