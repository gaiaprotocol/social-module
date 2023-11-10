import UserPublic from "../database-interface/SoFiUserPublic.js";

class TempUserPublicCacher {
  private userDetailsMap = new Map<string, UserPublic>();
  private xUsernameToUserIdMap = new Map<string, string>();
  private walletAddressToUserIdMap = new Map<string, string>();

  public cache(userDetails: UserPublic) {
    this.userDetailsMap.set(userDetails.user_id, userDetails);
    if (userDetails.x_username) {
      this.xUsernameToUserIdMap.set(
        userDetails.x_username,
        userDetails.user_id,
      );
    }
    if (userDetails.wallet_address) {
      this.walletAddressToUserIdMap.set(
        userDetails.wallet_address,
        userDetails.user_id,
      );
    }
  }

  public get(userId: string): UserPublic | undefined {
    return this.userDetailsMap.get(userId);
  }

  public getByXUsername(xUsername: string): UserPublic | undefined {
    const userId = this.xUsernameToUserIdMap.get(xUsername);
    if (userId) {
      return this.get(userId);
    }
  }

  public getByWalletAddress(walletAddress: string): UserPublic | undefined {
    const userId = this.walletAddressToUserIdMap.get(walletAddress);
    if (userId) {
      return this.get(userId);
    }
  }
}

export default new TempUserPublicCacher();
