import { UserService } from "common-app-module";
export default class SoFiUserService extends UserService {
    async fetchByXUsername(xUsername) {
        const data = await this.safeFetch((b) => b.select(this.selectQuery).eq("x_username", xUsername));
        return data?.[0];
    }
}
//# sourceMappingURL=SoFiUserService.js.map