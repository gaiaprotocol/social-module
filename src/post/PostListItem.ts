import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
import PostThread from "./PostThread.js";

export default class PostListItem<T extends Post> extends SocialComponent {
  constructor(
    posts: T[],
    options: {
      mainPostId: number;
      repostedPostIds: number[];
      likedPostIds: number[];
      newPostIds: number[];
      signedUserId?: string;
    },
    interactions: PostInteractions<T>,
  ) {
    super(".post-list-item");
    this.append(new PostThread(posts, options, interactions));
  }
}
