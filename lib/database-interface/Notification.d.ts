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
    triggered_by: string;
    type: T;
    source_id?: number;
    read_at?: string;
    created_at: string;
}
//# sourceMappingURL=Notification.d.ts.map