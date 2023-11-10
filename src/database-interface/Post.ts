import Message, { isEqualMessage, MessageSelectQuery } from "./Message.js";

export default interface Post extends Message {
  parent?: number;
  comment_count: number;
  repost_count: number;
  like_count: number;
}

export const PostSelectQuery = MessageSelectQuery;

export const isEqualPost = (a: Post, b: Post) =>
  isEqualMessage(a, b) &&
  (a.parent ?? undefined) === (b.parent ?? undefined) &&
  a.comment_count === b.comment_count &&
  a.repost_count === b.repost_count &&
  a.like_count === b.like_count;
