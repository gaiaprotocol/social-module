import { TempUserPublicCacher } from "common-app-module";
import { default as SoFiUserPublic } from "../database-interface/SoFiUserPublic.js";
export default class TempSoFiUserPublicCacher<T extends SoFiUserPublic> extends TempUserPublicCacher<T> {
    private walletAddressToUserIdMap;
    private xUsernameToUserIdMap;
    cache(userDetails: T): void;
    getByWalletAddress(walletAddress: string): T | undefined;
    getByXUsername(xUsername: string): T | undefined;
}
//# sourceMappingURL=TempSoFiUserPublicCacher.d.ts.map