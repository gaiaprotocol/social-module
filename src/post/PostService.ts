import { Supabase } from "common-app-module";
import Post from "../database-interface/Post.js";
import MessageService from "../message/MessageService.js";

export default class PostService<T extends Post> extends MessageService<T> {
  constructor(
    postTableName: string,
    private repostTableName: string,
    private likeTableName: string,
    selectQuery: string,
    fetchLimit: number,
  ) {
    super(postTableName, selectQuery, fetchLimit);
    this.addAllowedEvents("newGlobalPost");
  }

  protected notifyNewGlobalPost(post: T) {
    this.fireEvent("newGlobalPost", post);
  }

  public async fetchFollowingPosts(
    userId: string,
    lastPostId?: number,
  ): Promise<T[]> {
    const { data, error } = await Supabase.client.rpc("get_following_posts", {
      p_user_id: userId,
      last_post_id: lastPostId,
      max_count: this.fetchLimit,
    });
    if (error) throw error;
    const posts = Supabase.safeResult(data) ?? [];
    for (const post of posts) {
      post.author = {
        user_id: post.author,
        display_name: post.author_display_name,
        profile_image: post.author_profile_image,
        profile_image_thumbnail: post.author_profile_image_thumbnail,
        x_username: post.author_x_username,
      };
    }
    return posts;
  }

  public async fetchUserRepostedPosts(
    postIds: number[],
    userId: string,
  ): Promise<number[]> {
    const data = await Supabase.safeFetch(
      this.repostTableName,
      (b) => b.select("post_id").in("post_id", postIds).eq("user_id", userId),
    );
    return data ? data.map((d: any) => d.post_id) : [];
  }

  public async fetchUserLikedPosts(
    postIds: number[],
    userId: string,
  ): Promise<number[]> {
    const data = await Supabase.safeFetch(
      this.likeTableName,
      (b) => b.select("post_id").in("post_id", postIds).eq("user_id", userId),
    );
    return data ? data.map((d: any) => d.post_id) : [];
  }

  public async repost(postId: number) {
    //TODO:
  }

  public async unrepost(postId: number) {
    //TODO:
  }

  public async like(postId: number) {
    //TODO:
  }

  public async unlike(postId: number) {
    //TODO:
  }
}
