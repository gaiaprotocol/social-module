import Post from "../database-interface/Post.js";

export default class TempPostCacher<T extends Post> {
  private postMap = new Map<number, T>();

  public cache(post: T) {
    this.postMap.set(post.id, post);
  }

  public get(postId: number): T | undefined {
    return this.postMap.get(postId);
  }
}
