import UserDetails from "../database-interface/UserDetails.js";
declare class TempUserDetailsCacher {
    private userDetailsMap;
    private xUsernameToUserIdMap;
    private walletAddressToUserIdMap;
    cache(userDetails: UserDetails): void;
    get(userId: string): UserDetails | undefined;
    getByXUsername(xUsername: string): UserDetails | undefined;
    getByWalletAddress(walletAddress: string): UserDetails | undefined;
}
declare const _default: TempUserDetailsCacher;
export default _default;
//# sourceMappingURL=TempUserDetailsCacher.d.ts.map