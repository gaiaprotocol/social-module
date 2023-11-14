import Post from "../database-interface/Post.js";

export default class TempPostCacher<T extends Post> {
  private postMap = new Map<number, {
    posts: T[];
    repostedPostIds: number[];
    likedPostIds: number[];
  }>();

  public cache(mainPostId: number, data: {
    posts: T[];
    repostedPostIds: number[];
    likedPostIds: number[];
  }) {
    this.postMap.set(mainPostId, data);
  }

  public get(mainPostId: number): {
    posts: T[];
    repostedPostIds: number[];
    likedPostIds: number[];
  } | undefined {
    return this.postMap.get(mainPostId);
  }
}
