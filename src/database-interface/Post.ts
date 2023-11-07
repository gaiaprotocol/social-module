import { I18NText, isEqualRich, Rich } from "common-app-module";

export enum PostTarget {
  EVERYONE,
  KEY_HOLDERS,
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

export const PostSelectQuery =
  "*, author(user_id, display_name, profile_image, x_username)";

const isEqualAuthor = (a: Author, b: Author) =>
  (a.display_name ?? undefined) === (b.display_name ?? undefined) &&
  (a.profile_image ?? undefined) === (b.profile_image ?? undefined) &&
  (a.x_username ?? undefined) === (b.x_username ?? undefined);

export const isEqualPost = (a: Post | undefined, b: Post | undefined) =>
  a?.id == b?.id &&
  a?.guild_id == b?.guild_id &&
  a?.target == b?.target &&
  isEqualAuthor(a?.author ?? { user_id: "" }, b?.author ?? { user_id: "" }) &&
  a?.message == b?.message &&
  isEqualRich(a?.rich ?? {}, b?.rich ?? {}) &&
  a?.post_ref == b?.post_ref &&
  a?.comment_count == b?.comment_count &&
  a?.repost_count == b?.repost_count &&
  a?.like_count == b?.like_count;
