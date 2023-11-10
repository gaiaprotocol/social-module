import { TempUserCacher } from "common-app-module";
export default class TempSoFiUserCacher extends TempUserCacher {
    walletToIdMap = new Map();
    xToIdMap = new Map();
    cache(user) {
        super.cache(user);
        if (user.wallet_address) {
            this.walletToIdMap.set(user.wallet_address, user.user_id);
        }
        if (user.x_username) {
            this.xToIdMap.set(user.x_username, user.user_id);
        }
    }
    getByWalletAddress(walletAddress) {
        const userId = this.walletToIdMap.get(walletAddress);
        if (userId) {
            return this.get(userId);
        }
    }
    getByXUsername(xUsername) {
        const userId = this.xToIdMap.get(xUsername);
        if (userId) {
            return this.get(userId);
        }
    }
}
//# sourceMappingURL=TempSoFiUserCacher.js.map