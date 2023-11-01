import { n2u } from "common-app-module";
export var PostTarget;
(function (PostTarget) {
    PostTarget[PostTarget["EVERYONE"] = 0] = "EVERYONE";
    PostTarget[PostTarget["KEY_HOLDERS"] = 1] = "KEY_HOLDERS";
})(PostTarget || (PostTarget = {}));
const isEqualRich = (a, b) => {
    return a.files?.length === b.files?.length && (a.files?.every((file, index) => {
        const otherFile = b.files?.[index];
        return n2u(file.url) === n2u(otherFile?.url) &&
            n2u(file.thumbnailUrl) === n2u(otherFile?.thumbnailUrl) &&
            n2u(file.fileName) === n2u(otherFile?.fileName) &&
            n2u(file.fileType) === n2u(otherFile?.fileType) &&
            n2u(file.fileSize) === n2u(otherFile?.fileSize);
    }) ?? false);
};
export const isEqualPost = (a, b) => n2u(a?.id) === n2u(b?.id) &&
    n2u(a?.guild_id) === n2u(b?.guild_id) &&
    n2u(a?.target) === n2u(b?.target) &&
    n2u(a?.author) === n2u(b?.author) &&
    n2u(a?.author_name) === n2u(b?.author_name) &&
    n2u(a?.author_avatar_url) === n2u(b?.author_avatar_url) &&
    n2u(a?.author_x_username) === n2u(b?.author_x_username) &&
    n2u(a?.message) === n2u(b?.message) &&
    isEqualRich(a?.rich ?? {}, b?.rich ?? {}) &&
    n2u(a?.post_ref) === n2u(b?.post_ref) &&
    n2u(a?.comment_count) === n2u(b?.comment_count) &&
    n2u(a?.repost_count) === n2u(b?.repost_count) &&
    n2u(a?.like_count) === n2u(b?.like_count);
//# sourceMappingURL=Post.js.map