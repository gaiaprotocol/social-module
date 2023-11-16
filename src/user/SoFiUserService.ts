import { UserService } from "common-app-module";
import SoFiUserPublic from "../database-interface/SoFiUserPublic.js";

export default class SoFiUserService<T extends SoFiUserPublic>
  extends UserService<T> {
  public async fetchByXUsername(xUsername: string): Promise<T | undefined> {
    const data = await this.safeFetch((b) =>
      b.select(this.selectQuery).eq("x_username", xUsername)
    );
    return data?.[0];
  }
}
