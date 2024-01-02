import { EventContainer } from "@common-module/app";
import SoFiUserPublic from "../database-interface/SoFiUserPublic.js";
export default abstract class SignedUserManager<UT extends SoFiUserPublic> extends EventContainer {
    user: UT | undefined;
    get signed(): boolean;
    constructor();
    fetchUserOnInit(): Promise<void>;
    protected abstract fetchUser(userId: string): Promise<UT | undefined>;
    signOut(): Promise<void>;
}
//# sourceMappingURL=SignedUserManager.d.ts.map