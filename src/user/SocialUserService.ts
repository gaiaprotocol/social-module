import { UserService } from "@common-module/app";
import SocialUserPublic from "../database-interface/SocialUserPublic.js";

export default class SocialUserService<T extends SocialUserPublic>
  extends UserService<T> {
  public async fetchByXUsername(xUsername: string): Promise<T | undefined> {
    return await this.safeSelectSingle((b) => b.eq("x_username", xUsername));
  }
}
