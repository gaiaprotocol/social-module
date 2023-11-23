import { DomNode, msg } from "common-app-module";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
import PostList from "./PostList.js";
import PostService from "./PostService.js";

export default class FollowingPostList<T extends Post> extends PostList<T> {
  constructor(
    postService: PostService<T>,
    options: {
      signedUserId: string;
      wait?: boolean;
    },
    interactions: PostInteractions<T>,
    initialLoadingAnimation: DomNode,
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
      initialLoadingAnimation,
    );
  }

  protected async fetchPosts(): Promise<{
    fetchedPosts: { posts: T[]; mainPostId: number }[];
    repostedPostIds: number[];
    likedPostIds: number[];
  }> {
    const result = await this.postService.fetchFollowingPosts(
      this.options.signedUserId!,
      this.lastPostId,
    );
    return {
      fetchedPosts: result.posts.map((p) => ({
        posts: [p],
        mainPostId: p.id,
      })),
      repostedPostIds: result.repostedPostIds,
      likedPostIds: result.likedPostIds,
    };
  }
}
