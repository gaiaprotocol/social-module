import { TempUserCacher } from "common-app-module";
import { default as SoFiUserPublic } from "../database-interface/SoFiUserPublic.js";
export default class TempSoFiUserCacher<T extends SoFiUserPublic> extends TempUserCacher<T> {
    private walletToIdMap;
    private xToIdMap;
    cache(user: T): void;
    getByWalletAddress(walletAddress: string): T | undefined;
    getByXUsername(xUsername: string): T | undefined;
}
//# sourceMappingURL=TempSoFiUserCacher.d.ts.map