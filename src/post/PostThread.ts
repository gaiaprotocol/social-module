import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostDisplay from "./PostDisplay.js";
import PostForm from "./PostForm.js";
import PostInteractions from "./PostInteractions.js";

// Displays all connected Posts in a thread.
export default class PostThread<T extends Post> extends SocialComponent {
  private postDisplays: PostDisplay<T>[] = [];

  constructor(
    posts: T[],
    options: {
      inView?: boolean;
      mainPostId: number;
      repostedPostIds: number[];
      likedPostIds: number[];
      newPostIds: number[];
      signedUserId?: string;
    },
    interactions: PostInteractions<T>,
    form?: PostForm,
  ) {
    super(".post-thread");

    let parent = true;

    for (const post of posts) {
      const postDisplay = new PostDisplay(post, {
        inView: options.inView && post.id === options.mainPostId,
        owner: options.signedUserId !== undefined &&
          post.author.user_id === options.signedUserId,
        reposted: options.repostedPostIds.includes(post.id),
        liked: options.likedPostIds.includes(post.id),
        new: options.newPostIds.includes(post.id),
      }, interactions).appendTo(this);

      this.postDisplays.push(postDisplay);

      if (post.id === options.mainPostId) {
        parent = false;

        if (options.signedUserId && form) {
          form.appendTo(this);
        }
      }

      if (parent) postDisplay.addClass("parent");
    }
  }

  public findPostDisplay(postId: number): PostDisplay<T> | undefined {
    return this.postDisplays.find((postDisplay) =>
      postDisplay.post.id === postId
    );
  }
}
