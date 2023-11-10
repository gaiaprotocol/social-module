export default interface Author {
  user_id: string;
  display_name?: string;
  profile_image?: string;
  profile_image_thumbnail?: string;
  x_username?: string;
}

export const isEqualAuthor = (a: Author, b: Author) =>
  a.user_id === b.user_id &&
  (a.display_name ?? undefined) === (b.display_name ?? undefined) &&
  (a.profile_image ?? undefined) === (b.profile_image ?? undefined) &&
  (a.profile_image_thumbnail ?? undefined) ===
    (b.profile_image_thumbnail ?? undefined) &&
  (a.x_username ?? undefined) === (b.x_username ?? undefined);
