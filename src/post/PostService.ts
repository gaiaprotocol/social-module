import Post from "../database-interface/Post.js";
import MessageService from "../message/MessageService.js";

export default class PostService<T extends Post> extends MessageService<T> {
}
