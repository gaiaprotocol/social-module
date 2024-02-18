import { UserService } from "@common-module/app";
import SocialUserPublic from "../database-interface/SocialUserPublic.js";
export default abstract class SocialUserService<T extends SocialUserPublic> extends UserService<T> {
    fetchByXUsername(xUsername: string): Promise<T | undefined>;
}
//# sourceMappingURL=SocialUserService.d.ts.map