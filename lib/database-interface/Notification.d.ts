import Author from "./Author.js";
export declare enum NotificationType {
    FOLLOW = 0,
    POST_LIKE = 1,
    REPOST = 2,
    POST_COMMENT = 3,
    POST_TAG = 4
}
export default interface Notification<T = NotificationType> {
    id: number;
    user_id: string;
    triggerer: Author;
    type: T;
    source_id?: number;
    read_at?: string;
    created_at: string;
}
export declare const NotificationSelectQuery = "*, triggerer(user_id, display_name, profile_image, profile_image_thumbnail, x_username)";
//# sourceMappingURL=Notification.d.ts.map