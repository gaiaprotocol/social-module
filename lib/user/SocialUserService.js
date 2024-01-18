import { UserService } from "@common-module/app";
export default class SocialUserService extends UserService {
    async fetchByXUsername(xUsername) {
        return await this.safeSelectSingle((b) => b.eq("x_username", xUsername));
    }
}
//# sourceMappingURL=SocialUserService.js.map