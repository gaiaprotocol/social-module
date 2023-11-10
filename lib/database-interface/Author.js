export const isEqualAuthor = (a, b) => a.user_id === b.user_id &&
    (a.display_name ?? undefined) === (b.display_name ?? undefined) &&
    (a.profile_image ?? undefined) === (b.profile_image ?? undefined) &&
    (a.profile_image_thumbnail ?? undefined) ===
        (b.profile_image_thumbnail ?? undefined) &&
    (a.x_username ?? undefined) === (b.x_username ?? undefined);
//# sourceMappingURL=Author.js.map