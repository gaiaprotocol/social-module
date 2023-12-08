import SoFiComponent from "../SoFiComponent.js";
import Post from "../database-interface/Post.js";
import PostDisplay from "./PostDisplay.js";
import PostForm from "./PostForm.js";
import PostInteractions from "./PostInteractions.js";
import PostService from "./PostService.js";

// Displays all connected Posts in a thread.
export default class PostThread<T extends Post> extends SoFiComponent {
  constructor(
    posts: T[],
    private postService: PostService<T>,
    private options: {
      inView?: boolean;
      mainPostId: number;
      repostedPostIds: number[];
      likedPostIds: number[];
      newPostIds: number[];
      signedUserId?: string;
    },
    private interactions: PostInteractions<T>,
    private form?: PostForm,
  ) {
    super(".post-thread");
    this.addAllowedEvents("like", "unlike", "repost", "unrepost");

    let parent = true;

    for (const post of posts) {
      const postDisplay = this.addPostDisplay(post);

      if (post.id === options.mainPostId) {
        parent = false;

        if (options.signedUserId && form) {
          form.appendTo(this);
        }
      }

      if (parent) postDisplay.addClass("parent");
    }
  }

  private addPostDisplay(post: T, index?: number) {
    const postDisplay = new PostDisplay(
      post,
      this.postService,
      {
        inView: this.options.inView && post.id === this.options.mainPostId,
        owner: this.options.signedUserId !== undefined &&
          post.author.user_id === this.options.signedUserId,
        reposted: this.options.repostedPostIds.includes(post.id),
        liked: this.options.likedPostIds.includes(post.id),
        new: this.options.newPostIds.includes(post.id),
      },
      this.interactions,
    ).appendTo(this, index);

    ["like", "unlike", "repost", "unrepost"].forEach((event) =>
      postDisplay.on(event, () => this.fireEvent(event, post.id))
    );

    return postDisplay;
  }

  public addComment(post: T) {
    if (this.form) {
      const index = this.children.findIndex((child) => child === this.form);
      this.addPostDisplay(post, index + 1);
    }
  }
}
