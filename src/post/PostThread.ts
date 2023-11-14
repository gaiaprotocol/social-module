import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostDisplay from "./PostDisplay.js";
import PostForm from "./PostForm.js";
import PostInteractions from "./PostInteractions.js";

// Displays all connected Posts in a thread.
export default class PostThread<T extends Post> extends SocialComponent {
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

    let mainPostDisplay;
    for (const post of posts) {
      const postDisplay = new PostDisplay(post, {
        inView: options.inView && post.id === options.mainPostId,
        owner: options.signedUserId !== undefined &&
          post.author.user_id === options.signedUserId,
        reposted: options.repostedPostIds.includes(post.id),
        liked: options.likedPostIds.includes(post.id),
        new: options.newPostIds.includes(post.id),
      }, interactions).appendTo(this);

      if (post.comment_count > 0) {
        postDisplay.addClass("has-comments");
      }

      if (post.id === options.mainPostId) {
        mainPostDisplay = postDisplay;

        if (options.signedUserId && form) {
          form.appendTo(this);
        }
      }
    }

    if (mainPostDisplay) {
      mainPostDisplay.domElement.scrollIntoView();
    }
  }
}
