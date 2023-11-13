import { DomNode, msg } from "common-app-module";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
import PostList from "./PostList.js";
import PostService from "./PostService.js";

export default class FollowingPostList<T extends Post> extends PostList<T> {
  constructor(
    postService: PostService<T>,
    options: {
      signedUserId?: string;
      wait?: boolean;
    },
    interactions: PostInteractions,
    loadingAnimation: DomNode,
  ) {
    super(
      ".following-post-list",
      postService,
      {
        storeName: "following-posts",
        emptyMessage: msg("following-post-list-empty-message"),
        ...options,
      },
      interactions,
      loadingAnimation,
    );
  }

  protected fetchPosts(): Promise<{ posts: Post[]; mainPostId: number }[]> {
    throw new Error("Method not implemented.");
  }
}
