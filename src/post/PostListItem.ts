import SoFiComponent from "../SoFiComponent.js";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
import PostService from "./PostService.js";
import PostThread from "./PostThread.js";

export default class PostListItem<T extends Post> extends SoFiComponent {
  constructor(
    posts: T[],
    postService: PostService<T>,
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
    this.addAllowedEvents("like", "unlike", "repost", "unrepost");
    const thread = new PostThread(posts, postService, options, interactions)
      .appendTo(this);
    ["like", "unlike", "repost", "unrepost"].forEach((event) =>
      thread.on(event, (postId) => this.fireEvent(event, postId))
    );
  }
}
