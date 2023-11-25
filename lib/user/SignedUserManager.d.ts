import { EventContainer } from "common-app-module";
import SoFiUserPublic from "../database-interface/SoFiUserPublic.js";
export default abstract class SignedUserManager extends EventContainer {
    user: SoFiUserPublic | undefined;
    get signed(): boolean;
    get walletLinked(): boolean;
    constructor();
    fetchUserOnInit(): Promise<void>;
    protected abstract fetchUser(userId: string): Promise<SoFiUserPublic | undefined>;
    signOut(): Promise<void>;
}
//# sourceMappingURL=SignedUserManager.d.ts.map