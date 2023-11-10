import { DomNode, Store } from "common-app-module";
import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
import PostListItem from "./PostListItem.js";

export default abstract class PostList extends SocialComponent {
  private store: Store;

  constructor(
    private options: {
      storeName: string;
      signedUserId?: string;
      emptyMessage: string;
    },
    private interactions: PostInteractions,
    loadingAnimation: DomNode,
  ) {
    super(".post-list");
    this.store = new Store(options.storeName);
    this.domElement.setAttribute("empty-message", options.emptyMessage);

    const cachedPosts = this.store.get<{
      posts: Post[];
      mainPostId: number;
    }[]>("cached-posts");
    const cachedRepostedPostIds =
      this.store.get<number[]>("cached-reposted-post-ids") ?? [];
    const cachedLikedPostIds =
      this.store.get<number[]>("cached-liked-post-ids") ?? [];

    if (cachedPosts && cachedPosts.length > 0) {
      for (const p of cachedPosts) {
        this.addPostItem(p.posts, {
          mainPostId: p.mainPostId,
          repostedPostIds: cachedRepostedPostIds,
          likedPostIds: cachedLikedPostIds,
          newPostIds: [],
          signedUserId: options.signedUserId,
        }, interactions);
      }
    } else {
      this.append(loadingAnimation);
    }

    this.refresh();
  }

  private addPostItem(
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
    new PostListItem(posts, options, interactions).appendTo(this, 0);
  }

  protected abstract fetchPosts(): Promise<{
    posts: {
      posts: Post[];
      mainPostId: number;
    }[];
    repostedPostIds: number[];
    likedPostIds: number[];
  }>;

  private async refresh() {
    const cachedPosts = this.store.get<{
      posts: Post[];
      mainPostId: number;
    }[]>("cached-posts") ?? [];

    const {
      posts: fetchedPosts,
      repostedPostIds,
      likedPostIds,
    } = await this.fetchPosts();

    const posts = fetchedPosts.reverse();
    this.store.set("cached-posts", posts, true);
    this.store.set("cached-reposted-post-ids", repostedPostIds, true);
    this.store.set("cached-liked-post-ids", likedPostIds, true);

    if (!this.deleted) {
      const cachedPostIds = new Set(cachedPosts.map((p) => p.mainPostId));
      const newPostIds = posts
        .filter((p) => !cachedPostIds.has(p.mainPostId))
        .map((p) => p.mainPostId);

      this.empty();
      for (const p of posts) {
        this.addPostItem(p.posts, {
          mainPostId: p.mainPostId,
          repostedPostIds,
          likedPostIds,
          newPostIds,
          signedUserId: this.options.signedUserId,
        }, this.interactions);
      }
    }
  }
}
