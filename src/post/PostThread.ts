import SocialComponent from "../SocialComponent.js";
import Post from "../database-interface/Post.js";
import PostDisplay from "./PostDisplay.js";
import PostInteractions from "./PostInteractions.js";

// Displays all connected Posts in a thread.
export default class PostThread extends SocialComponent {
  constructor(
    posts: Post[],
    options: {
      mainPostId: number;
      repostedPostIds: number[];
      likedPostIds: number[];
      signedUserId: string;
    },
    interactions: PostInteractions,
  ) {
    super(".post-thread");

    let mainPostDisplay;
    for (const post of posts) {
      const postDisplay = new PostDisplay(post, {
        inView: post.id === options.mainPostId,
        owner: post.author.user_id === options.signedUserId,
        reposted: options.repostedPostIds.includes(post.id),
        liked: options.likedPostIds.includes(post.id),
      }, interactions).appendTo(this);

      if (post.comment_count > 0) {
        postDisplay.addClass("has-comments");
      }

      if (post.id === options.mainPostId) {
        mainPostDisplay = postDisplay;
      }
    }

    if (mainPostDisplay) {
      mainPostDisplay.domElement.scrollIntoView();
    }
  }
}
