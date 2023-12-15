import Author from "./Author.js";

export enum NotificationType {
  FOLLOW,
  POST_LIKE,
  REPOST,
  POST_COMMENT,
  POST_TAG,
}

export default interface Notification<T = NotificationType> {
  id: number;
  user_id: string;
  triggerer?: Author;
  type: T;
  read_at?: string;
  created_at: string;
}

export const NotificationSelectQuery =
  "*, triggerer(user_id, display_name, profile_image, profile_image_thumbnail, stored_profile_image, stored_profile_image_thumbnail, x_username)";
