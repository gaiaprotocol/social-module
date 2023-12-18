import { Supabase } from "common-app-module";
import Post from "../database-interface/Post.js";
import MessageService from "../message/MessageService.js";

export default abstract class PostService<T extends Post>
  extends MessageService<T> {
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

  public abstract checkSigned(): void;

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
        avatar: post.author_avatar,
        avatar_thumb: post.author_avatar_thumb,
        stored_avatar: post.author_stored_avatar,
        stored_avatar_thumb: post.author_stored_avatar_thumb,
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
    lastCommentId: number | undefined,
    signedUserId: string | undefined,
  ) {
    const { data, error } = await Supabase.client.rpc("get_post_and_comments", {
      p_post_id: postId,
      last_comment_id: lastCommentId,
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

  public async fetchUserPosts(
    userId: string,
    lastPostId: number | undefined,
  ) {
    const { data, error } = await Supabase.client.rpc("get_user_posts", {
      p_user_id: userId,
      last_post_id: lastPostId,
      max_count: this.fetchLimit,
    });
    if (error) throw error;
    return this.enhancePostData(data ?? []);
  }

  public async fetchUserCommentPosts(
    userId: string,
    lastPostId: number | undefined,
  ) {
    const { data, error } = await Supabase.client.rpc(
      "get_user_comment_posts",
      {
        p_user_id: userId,
        last_post_id: lastPostId,
        max_count: this.fetchLimit,
      },
    );
    if (error) throw error;
    return this.enhancePostData(data ?? []);
  }

  public async fetchLikedPosts(
    userId: string,
    lastLikedAt: string | undefined,
  ) {
    const { data, error } = await Supabase.client.rpc("get_liked_posts", {
      p_user_id: userId,
      last_liked_at: lastLikedAt,
      max_count: this.fetchLimit,
    });
    if (error) throw error;

    if (data && data.length > 0) {
      const mostRecentLikedAt = data.reduce((latest: any, post: any) => {
        const likeTime = new Date(post.like_created_at);
        return latest > likeTime ? latest : likeTime;
      }, new Date(0));
      lastLikedAt = mostRecentLikedAt.toISOString();
    }

    return {
      data: this.enhancePostData(data ?? []),
      lastLikedAt,
    };
  }

  public async fetchReposts(
    userId: string,
    lastRepostedAt: string | undefined,
  ) {
    const { data, error } = await Supabase.client.rpc("get_reposts", {
      p_user_id: userId,
      last_reposted_at: lastRepostedAt,
      max_count: this.fetchLimit,
    });
    if (error) throw error;

    if (data) {
      const mostRecentRepostedAt = data.reduce((latest: any, post: any) => {
        const repostTime = new Date(post.repost_created_at);
        return latest > repostTime ? latest : repostTime;
      }, new Date(0));
      lastRepostedAt = mostRecentRepostedAt.toISOString();
    }

    return {
      data: this.enhancePostData(data ?? []),
      lastRepostedAt,
    };
  }

  public async findPosts(
    query: string,
    lastPostId: number | undefined,
    signedUserId: string | undefined,
  ) {
    const { data, error } = await Supabase.client.rpc("find_posts", {
      p_user_id: signedUserId,
      search_string: query,
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
