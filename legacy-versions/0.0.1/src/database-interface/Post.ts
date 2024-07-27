import Author from "./Author.js";
import Message, { MessageSelectQuery } from "./Message.js";

export default interface Post extends Message {
  parent?: number;
  target_details?: any;
  author: Author;
  comment_count: number;
  repost_count: number;
  like_count: number;
}

export const PostSelectQuery = MessageSelectQuery;
