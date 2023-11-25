import { EventContainer, Supabase } from "common-app-module";
import SoFiUserPublic from "../database-interface/SoFiUserPublic.js";

export default abstract class SignedUserManager extends EventContainer {
  public user: SoFiUserPublic | undefined;

  public get signed() {
    return this.user !== undefined;
  }

  public get walletLinked() {
    return this.user?.wallet_address !== undefined;
  }

  constructor() {
    super();
    this.addAllowedEvents("walletLinked");
  }

  public async fetchUserOnInit() {
    const { data, error } = await Supabase.client.auth.getSession();
    if (error) throw error;
    const sessionUser = data?.session?.user;
    if (sessionUser) {
      this.user = await this.fetchUser(sessionUser.id);
    }
  }

  protected abstract fetchUser(
    userId: string,
  ): Promise<SoFiUserPublic | undefined>;

  public async signOut() {
    await Supabase.signOut();
    location.reload();
  }
}
