import { I18NText, Rich } from "common-app-module";
import Author from "./Author.js";

export default interface Message {
  id: number;
  author?: Author;
  message?: string;
  translated?: I18NText;
  rich?: Rich;
  created_at: string;
  updated_at?: string;
}

export const MessageSelectQuery =
  "*, author(user_id, display_name, avatar, avatar_thumb, stored_avatar, stored_avatar_thumb, x_username)";
