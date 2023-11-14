import { ListLoadingBar, Store } from "common-app-module";
import SocialComponent from "../SocialComponent.js";
import PostListItem from "./PostListItem.js";
export default class PostList extends SocialComponent {
    postService;
    options;
    interactions;
    store;
    refreshed = false;
    lastPostId;
    constructor(tag, postService, options, interactions, loadingAnimation) {
        super(tag + ".post-list");
        this.postService = postService;
        this.options = options;
        this.interactions = interactions;
        this.store = new Store(options.storeName);
        this.domElement.setAttribute("data-empty-message", options.emptyMessage);
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
            this.append(loadingAnimation);
        }
        if (!options.wait)
            this.refresh();
    }
    addPostItem(posts, options, interactions) {
        new PostListItem(posts, options, interactions).appendTo(this, 0);
    }
    async refresh() {
        this.append(new ListLoadingBar());
        const cachedPosts = this.store.get("cached-posts") ?? [];
        const { fetchedPosts, repostedPostIds, likedPostIds, } = await this.fetchPosts();
        const posts = fetchedPosts.reverse();
        this.store.set("cached-posts", posts, true);
        this.store.set("cached-reposted-post-ids", repostedPostIds, true);
        this.store.set("cached-liked-post-ids", likedPostIds, true);
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
        const cachedPosts = this.store.get("cached-posts") ?? [];
        cachedPosts.push({ posts: [post], mainPostId: post.id });
        this.store.set("cached-posts", cachedPosts, true);
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