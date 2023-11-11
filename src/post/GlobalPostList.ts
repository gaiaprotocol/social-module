import { DomNode, msg } from "common-app-module";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
import PostList from "./PostList.js";
import PostService from "./PostService.js";

export default class GlobalPostList<T extends Post = Post> extends PostList<T> {
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
      ".global-post-list",
      postService,
      {
        storeName: "global-posts",
        emptyMessage: msg("global-post-list-empty-message"),
        ...options,
      },
      interactions,
      loadingAnimation,
    );
  }

  protected async fetchPosts(): Promise<
    { posts: Post[]; mainPostId: number }[]
  > {
    const posts = await this.postService.fetchGlobalMessages(this.lastPostId);
    return posts.map((p) => ({
      posts: [p],
      mainPostId: p.id,
    }));
  }
}
