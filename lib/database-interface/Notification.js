export var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["FOLLOW"] = 0] = "FOLLOW";
    NotificationType[NotificationType["POST_LIKE"] = 1] = "POST_LIKE";
    NotificationType[NotificationType["REPOST"] = 2] = "REPOST";
    NotificationType[NotificationType["POST_COMMENT"] = 3] = "POST_COMMENT";
    NotificationType[NotificationType["POST_TAG"] = 4] = "POST_TAG";
})(NotificationType || (NotificationType = {}));
export const NotificationSelectQuery = "*, triggerer(user_id, display_name, profile_image, profile_image_thumbnail, stored_profile_image, stored_profile_image_thumbnail, x_username)";
//# sourceMappingURL=Notification.js.map