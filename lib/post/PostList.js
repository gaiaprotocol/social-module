import { Store } from "common-app-module";
import SocialComponent from "../SocialComponent.js";
import PostListItem from "./PostListItem.js";
export default class PostList extends SocialComponent {
    options;
    interactions;
    store;
    constructor(options, interactions, loadingAnimation) {
        super(".post-list");
        this.options = options;
        this.interactions = interactions;
        this.store = new Store(options.storeName);
        this.domElement.setAttribute("empty-message", options.emptyMessage);
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
        this.refresh();
    }
    addPostItem(posts, options, interactions) {
        new PostListItem(posts, options, interactions).appendTo(this, 0);
    }
    async refresh() {
        const cachedPosts = this.store.get("cached-posts") ?? [];
        const { posts: fetchedPosts, repostedPostIds, likedPostIds, } = await this.fetchPosts();
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
        }
    }
}
//# sourceMappingURL=PostList.js.map