class TempUserPublicCacher {
    userDetailsMap = new Map();
    xUsernameToUserIdMap = new Map();
    walletAddressToUserIdMap = new Map();
    cache(userDetails) {
        this.userDetailsMap.set(userDetails.user_id, userDetails);
        if (userDetails.x_username) {
            this.xUsernameToUserIdMap.set(userDetails.x_username, userDetails.user_id);
        }
        if (userDetails.wallet_address) {
            this.walletAddressToUserIdMap.set(userDetails.wallet_address, userDetails.user_id);
        }
    }
    get(userId) {
        return this.userDetailsMap.get(userId);
    }
    getByXUsername(xUsername) {
        const userId = this.xUsernameToUserIdMap.get(xUsername);
        if (userId) {
            return this.get(userId);
        }
    }
    getByWalletAddress(walletAddress) {
        const userId = this.walletAddressToUserIdMap.get(walletAddress);
        if (userId) {
            return this.get(userId);
        }
    }
}
export default new TempUserPublicCacher();
//# sourceMappingURL=TempUserDetailsCacher.js.map