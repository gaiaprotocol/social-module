import { TempUserPublicCacher } from "common-app-module";
export default class TempSoFiUserPublicCacher extends TempUserPublicCacher {
    walletAddressToUserIdMap = new Map();
    xUsernameToUserIdMap = new Map();
    cache(userDetails) {
        super.cache(userDetails);
        if (userDetails.wallet_address) {
            this.walletAddressToUserIdMap.set(userDetails.wallet_address, userDetails.user_id);
        }
        if (userDetails.x_username) {
            this.xUsernameToUserIdMap.set(userDetails.x_username, userDetails.user_id);
        }
    }
    getByWalletAddress(walletAddress) {
        const userId = this.walletAddressToUserIdMap.get(walletAddress);
        if (userId) {
            return this.get(userId);
        }
    }
    getByXUsername(xUsername) {
        const userId = this.xUsernameToUserIdMap.get(xUsername);
        if (userId) {
            return this.get(userId);
        }
    }
}
//# sourceMappingURL=TempSoFiUserPublicCacher.js.map