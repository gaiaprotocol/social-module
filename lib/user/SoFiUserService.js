import { UserService } from "common-app-module";
export default class SoFiUserService extends UserService {
    async fetchByXUsername(xUsername) {
        return await this.safeSelectSingle((b) => b.eq("x_username", xUsername));
    }
}
//# sourceMappingURL=SoFiUserService.js.map