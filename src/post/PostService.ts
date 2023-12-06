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

  protected enhancePostData(posts: T[]): {
    posts: T[];
    repostedPostIds: number[];
    likedPostIds: number[];
  } {
    const _post = Supabase.safeResult<T[]>(posts);
    const repostedPostIds: number[] = [];
    const likedPostIds: number[] = [];

    for (const post of _post as any) {
      post.author = {
        user_id: post.author,
        display_name: post.author_display_name,
        profile_image: post.author_profile_image,
        profile_image_thumbnail: post.author_profile_image_thumbnail,
        x_username: post.author_x_username,
      };
      if (post.reposted) repostedPostIds.push(post.id);
      if (post.liked) likedPostIds.push(post.id);
    }

    return {
      posts: _post,
      repostedPostIds,
      likedPostIds,
    };
  }

  public async fetchPost(
    postId: number,
    signedUserId: string | undefined,
  ) {
    const { data, error } = await Supabase.client.rpc("get_post_and_comments", {
      p_post_id: postId,
      max_comment_count: this.fetchLimit,
      signed_user_id: signedUserId,
    });
    if (error) throw error;
    return this.enhancePostData(data ?? []);
  }

  public async fetchGlobalPosts(
    lastPostId: number | undefined,
    signedUserId: string | undefined,
  ) {
    const { data, error } = await Supabase.client.rpc("get_global_posts", {
      last_post_id: lastPostId,
      max_count: this.fetchLimit,
      signed_user_id: signedUserId,
    });
    if (error) throw error;
    return this.enhancePostData(data ?? []);
  }

  public async fetchFollowingPosts(
    userId: string,
    lastPostId: number | undefined,
  ) {
    const { data, error } = await Supabase.client.rpc("get_following_posts", {
      p_user_id: userId,
      last_post_id: lastPostId,
      max_count: this.fetchLimit,
    });
    if (error) throw error;
    return this.enhancePostData(data ?? []);
  }

  public async repost(postId: number) {
    const { error } = await Supabase.client.from(this.repostTableName).insert({
      post_id: postId,
    });
    if (error) throw error;
  }

  public async unrepost(postId: number) {
    const { error } = await Supabase.client.from(this.repostTableName).delete()
      .eq("post_id", postId);
    if (error) throw error;
  }

  public async like(postId: number) {
    const { error } = await Supabase.client.from(this.likeTableName).insert({
      post_id: postId,
    });
    if (error) throw error;
  }

  public async unlike(postId: number) {
    const { error } = await Supabase.client.from(this.likeTableName).delete()
      .eq("post_id", postId);
    if (error) throw error;
  }
}
