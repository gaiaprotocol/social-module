import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
import PostThread from "./PostThread.js";

export default class PostListItem extends SocialComponent {
  constructor(
    posts: Post[],
    options: {
      mainPostId: number;
      repostedPostIds: number[];
      likedPostIds: number[];
      newPostIds: number[];
      signedUserId?: string;
    },
    interactions: PostInteractions,
  ) {
    super(".post-list-item");
    this.append(new PostThread(posts, options, interactions));
  }
}
