import { isEqualRich } from "common-app-module";
import { isEqualAuthor } from "./Author.js";
export const MessageSelectQuery = "*, author(user_id, display_name, profile_image, profile_image_thumbnail, x_username)";
export const isEqualMessage = (a, b) => a.id == b.id &&
    isEqualAuthor(a.author, b.author) &&
    a.message === b.message &&
    isEqualRich(a.rich ?? {}, b.rich ?? {});
//# sourceMappingURL=Message.js.map