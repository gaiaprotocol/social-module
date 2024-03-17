import { SupabaseService } from "@common-module/app";
import FCMTokenInfo from "../database-interface/FCMTokenInfo.js";
declare class FCMTokenService extends SupabaseService<FCMTokenInfo> {
    constructor();
    fetch(userId: string, token: string): Promise<FCMTokenInfo | undefined>;
}
declare const _default: FCMTokenService;
export default _default;
//# sourceMappingURL=FCMTokenService.d.ts.map