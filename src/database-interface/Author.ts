export default interface Author {
  user_id: string;
  display_name?: string;
  profile_image?: string;
  profile_image_thumbnail?: string;
  x_username?: string;
}

export const isEqualAuthor = (a: Author, b: Author) =>
  a.user_id === b.user_id &&
  a.display_name === b.display_name &&
  a.profile_image === b.profile_image &&
  a.profile_image_thumbnail === b.profile_image_thumbnail &&
  a.x_username === b.x_username;
