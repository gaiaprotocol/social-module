import { DomNode, Store } from "common-app-module";
import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostInteractions from "./PostInteractions.js";
import PostListItem from "./PostListItem.js";
import PostService from "./PostService.js";

export default abstract class PostList<T extends Post = Post>
  extends SocialComponent {
  private store: Store;
  private refreshed = false;
  protected lastPostId: number | undefined;

  constructor(
    tag: string,
    protected postService: PostService<T>,
    private options: {
      storeName: string;
      signedUserId?: string;
      emptyMessage: string;
      wait?: boolean;
    },
    private interactions: PostInteractions,
    loadingAnimation: DomNode,
  ) {
    super(tag + ".post-list");
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

    if (!options.wait) this.refresh();
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
    posts: Post[];
    mainPostId: number;
  }[]>;

  private async _fetchPosts() {
    const fetchedPosts = await this.fetchPosts();
    const postIds = fetchedPosts.flatMap((item) =>
      item.posts.map((post) => post.id)
    );

    const repostedPostIds = this.options.signedUserId
      ? await this.postService.fetchUserRepostedPosts(
        postIds,
        this.options.signedUserId,
      )
      : [];

    const likedPostIds = this.options.signedUserId
      ? await this.postService.fetchUserLikedPosts(
        postIds,
        this.options.signedUserId,
      )
      : [];

    return {
      fetchedPosts,
      repostedPostIds,
      likedPostIds,
    };
  }

  private async refresh() {
    const cachedPosts = this.store.get<{
      posts: Post[];
      mainPostId: number;
    }[]>("cached-posts") ?? [];

    const {
      fetchedPosts,
      repostedPostIds,
      likedPostIds,
    } = await this._fetchPosts();

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

      this.lastPostId = posts[posts.length - 1]?.mainPostId;
      this.refreshed = true;
    }
  }

  private async loadMore() {
    const {
      fetchedPosts,
      repostedPostIds,
      likedPostIds,
    } = await this._fetchPosts();

    if (!this.deleted) {
      const posts = fetchedPosts.reverse();
      const newPostIds = posts.map((p) => p.mainPostId);

      for (const p of posts) {
        this.addPostItem(p.posts, {
          mainPostId: p.mainPostId,
          repostedPostIds,
          likedPostIds,
          newPostIds,
          signedUserId: this.options.signedUserId,
        }, this.interactions);
      }

      this.lastPostId = posts[posts.length - 1]?.mainPostId;
    }
  }

  public show() {
    this.deleteClass("hidden");
    if (!this.refreshed) this.refresh();
  }

  public hide() {
    this.addClass("hidden");
  }
}
