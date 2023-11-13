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
    return Supabase.safeResult(data) ?? [];
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
}
