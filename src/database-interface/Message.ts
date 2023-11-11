import { I18NText, isEqualRich, Rich } from "common-app-module";
import Author, { isEqualAuthor } from "./Author.js";

export default interface Message {
  id: number;
  author: Author;
  message?: string;
  translated?: I18NText;
  rich?: Rich;
  created_at: string;
  updated_at?: string;
}

export const MessageSelectQuery =
  "*, author(user_id, display_name, profile_image, profile_image_thumbnail, x_username)";

export const isEqualMessage = (a: Message, b: Message) =>
  a.id == b.id &&
  isEqualAuthor(a.author, b.author) &&
  a.message === b.message &&
  isEqualRich(a.rich ?? {}, b.rich ?? {});
