import { ListLoadingBar, Store } from "common-app-module";
import SoFiComponent from "../SoFiComponent.js";
import PostListItem from "./PostListItem.js";
export default class PostList extends SoFiComponent {
    postService;
    options;
    interactions;
    store;
    refreshed = false;
    lastPostId;
    constructor(tag, postService, options, interactions, initialLoadingAnimation) {
        super(tag + ".post-list");
        this.postService = postService;
        this.options = options;
        this.interactions = interactions;
        this.store = options.storeName ? new Store(options.storeName) : undefined;
        this.domElement.setAttribute("data-empty-message", options.emptyMessage);
        if (this.store) {
            const cachedPosts = this.store.get("cached-posts");
            const cachedRepostedPostIds = this.store.get("cached-reposted-post-ids") ?? [];
            const cachedLikedPostIds = this.store.get("cached-liked-post-ids") ?? [];
            if (cachedPosts && cachedPosts.length > 0) {
                for (const p of cachedPosts) {
                    this.addPostItem(p.posts, {
                        mainPostId: p.mainPostId,
                        repostedPostIds: cachedRepostedPostIds,
                        likedPostIds: cachedLikedPostIds,
                        newPostIds: [],
                        signedUserId: options.signedUserId,
                    }, interactions);
                }
            }
            else {
                this.append(initialLoadingAnimation);
            }
        }
        else {
            this.append(initialLoadingAnimation);
        }
    }
    addPostItem(posts, options, interactions) {
        const item = new PostListItem(posts, this.postService, options, interactions)
            .appendTo(this, 0);
        ["like", "unlike", "repost", "unrepost"].forEach((event) => item.on(event, (postId) => {
            if (this.store) {
                const cachedPosts = this.store.get("cached-posts") ?? [];
                const cachedRepostedPostIds = this.store.get("cached-reposted-post-ids") ?? [];
                const cachedLikedPostIds = this.store.get("cached-liked-post-ids") ?? [];
                cachedPosts.forEach((cachedPostGroup) => {
                    cachedPostGroup.posts.forEach((post) => {
                        if (post.id === postId) {
                            switch (event) {
                                case "like":
                                    post.like_count++;
                                    cachedLikedPostIds.push(postId);
                                    break;
                                case "unlike":
                                    post.like_count--;
                                    const likeIndex = cachedLikedPostIds.indexOf(postId);
                                    if (likeIndex > -1)
                                        cachedLikedPostIds.splice(likeIndex, 1);
                                    break;
                                case "repost":
                                    post.repost_count++;
                                    cachedRepostedPostIds.push(postId);
                                    break;
                                case "unrepost":
                                    post.repost_count--;
                                    const repostIndex = cachedRepostedPostIds.indexOf(postId);
                                    if (repostIndex > -1) {
                                        cachedRepostedPostIds.splice(repostIndex, 1);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    });
                });
                this.store.set("cached-posts", cachedPosts, true);
                this.store.set("cached-reposted-post-ids", cachedRepostedPostIds, true);
                this.store.set("cached-liked-post-ids", cachedLikedPostIds, true);
            }
        }));
    }
    async refresh() {
        this.append(new ListLoadingBar());
        const cachedPosts = this.store?.get("cached-posts") ?? [];
        const { fetchedPosts, repostedPostIds, likedPostIds, } = await this.fetchPosts();
        const posts = fetchedPosts.reverse();
        if (this.store) {
            this.store.set("cached-posts", posts, true);
            this.store.set("cached-reposted-post-ids", repostedPostIds, true);
            this.store.set("cached-liked-post-ids", likedPostIds, true);
        }
        if (!this.deleted) {
            const cachedPostIds = new Set(cachedPosts.map((p) => p.mainPostId));
            const newPostIds = posts
                .filter((p) => !cachedPostIds.has(p.mainPostId))
                .map((p) => p.mainPostId);
            this.empty();
            for (const p of posts) {
                this.addPostItem(p.posts, {
                    mainPostId: p.mainPostId,
                    repostedPostIds,
                    likedPostIds,
                    newPostIds,
                    signedUserId: this.options.signedUserId,
                }, this.interactions);
            }
            this.lastPostId = posts[posts.length - 1]?.mainPostId;
            this.refreshed = true;
        }
    }
    addNewPost(post) {
        const cachedPosts = this.store?.get("cached-posts") ?? [];
        cachedPosts.push({ posts: [post], mainPostId: post.id });
        this.store?.set("cached-posts", cachedPosts, true);
        this.addPostItem([post], {
            mainPostId: post.id,
            repostedPostIds: [],
            likedPostIds: [],
            newPostIds: [post.id],
            signedUserId: this.options.signedUserId,
        }, this.interactions);
    }
    async loadMore() {
        const { fetchedPosts, repostedPostIds, likedPostIds, } = await this.fetchPosts();
        if (!this.deleted) {
            const posts = fetchedPosts.reverse();
            const newPostIds = posts.map((p) => p.mainPostId);
            for (const p of posts) {
                this.addPostItem(p.posts, {
                    mainPostId: p.mainPostId,
                    repostedPostIds,
                    likedPostIds,
                    newPostIds,
                    signedUserId: this.options.signedUserId,
                }, this.interactions);
            }
            this.lastPostId = posts[posts.length - 1]?.mainPostId;
        }
    }
    show() {
        this.deleteClass("hidden");
        if (!this.refreshed)
            this.refresh();
    }
    hide() {
        this.addClass("hidden");
    }
}
//# sourceMappingURL=PostList.js.map