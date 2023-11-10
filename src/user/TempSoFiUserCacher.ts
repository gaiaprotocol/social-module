import { TempUserCacher } from "common-app-module";
import {
  default as SoFiUserPublic,
} from "../database-interface/SoFiUserPublic.js";

export default class TempSoFiUserCacher<T extends SoFiUserPublic>
  extends TempUserCacher<T> {
  private walletToIdMap = new Map<string, string>();
  private xToIdMap = new Map<string, string>();

  public cache(user: T) {
    super.cache(user);
    if (user.wallet_address) {
      this.walletToIdMap.set(user.wallet_address, user.user_id);
    }
    if (user.x_username) {
      this.xToIdMap.set(user.x_username, user.user_id);
    }
  }

  public getByWalletAddress(walletAddress: string): T | undefined {
    const userId = this.walletToIdMap.get(walletAddress);
    if (userId) {
      return this.get(userId);
    }
  }

  public getByXUsername(xUsername: string): T | undefined {
    const userId = this.xToIdMap.get(xUsername);
    if (userId) {
      return this.get(userId);
    }
  }
}
