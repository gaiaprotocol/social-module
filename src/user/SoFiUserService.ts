import { UserService } from "@common-module/app";
import SoFiUserPublic from "../database-interface/SoFiUserPublic.js";

export default class SoFiUserService<T extends SoFiUserPublic>
  extends UserService<T> {
  public async fetchByXUsername(xUsername: string): Promise<T | undefined> {
    return await this.safeSelectSingle((b) => b.eq("x_username", xUsername));
  }
}
