class IglooChatInteractions {
    openPostView(postId) {
        Router.go(`/post/${postId}`);
    }
    openAuthorProfile(author) {
        Router.go(`/${author.x_username}`, undefined, author);
    }
    openOwnerMenu(postId, rect) {
        new PostOwnerMenu(postId, {
            left: rect.right - 160,
            top: rect.top,
        });
    }
    openCommentPopup(post) {
        new PostCommentPopup(post);
    }
    async repost(postId) {
        await IglooPostService.repost(postId);
    }
    async unrepost(postId) {
        await IglooPostService.unrepost(postId);
    }
    async like(postId) {
        await IglooPostService.like(postId);
    }
    async unlike(postId) {
        await IglooPostService.unlike(postId);
    }
}
export default new IglooChatInteractions();
//# sourceMappingURL=IglooChatInteractions.js.map