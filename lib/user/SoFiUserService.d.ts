import { UserService } from "@common-module/app";
import SoFiUserPublic from "../database-interface/SoFiUserPublic.js";
export default class SoFiUserService<T extends SoFiUserPublic> extends UserService<T> {
    fetchByXUsername(xUsername: string): Promise<T | undefined>;
}
//# sourceMappingURL=SoFiUserService.d.ts.map