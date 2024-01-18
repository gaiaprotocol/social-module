import { UserService } from "@common-module/app";
import SocialUserPublic from "../database-interface/SoFiUserPublic.js";
export default class SoFiUserService<T extends SocialUserPublic> extends UserService<T> {
    fetchByXUsername(xUsername: string): Promise<T | undefined>;
}
//# sourceMappingURL=SoFiUserService.d.ts.map