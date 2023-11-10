import Post from "../database-interface/Post.js";

class TempPostCacher {
  private postMap = new Map<number, Post>();

  public cache(post: Post) {
    this.postMap.set(post.id, post);
  }

  public get(postId: number): Post | undefined {
    return this.postMap.get(postId);
  }
}

export default new TempPostCacher();
