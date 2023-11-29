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
  triggered_by: string;
  type: T;
  source_id?: number;
  read_at?: string;
  created_at: string;
}
