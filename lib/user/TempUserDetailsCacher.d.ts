import UserPublic from "../database-interface/SoFiUserPublic.js";
declare class TempUserDetailsCacher {
    private userDetailsMap;
    private xUsernameToUserIdMap;
    private walletAddressToUserIdMap;
    cache(userDetails: UserPublic): void;
    get(userId: string): UserPublic | undefined;
    getByXUsername(xUsername: string): UserPublic | undefined;
    getByWalletAddress(walletAddress: string): UserPublic | undefined;
}
declare const _default: TempUserDetailsCacher;
export default _default;
//# sourceMappingURL=TempUserDetailsCacher.d.ts.map