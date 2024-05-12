import { EventContainer, Store } from "@common-module/app";
import SocialUserPublic from "../database-interface/SocialUserPublic.js";
export default abstract class SignedUserManager<UT extends SocialUserPublic> extends EventContainer {
    protected store: Store;
    sessionUserId: string | undefined;
    user: UT | undefined;
    get signed(): boolean;
    private fetchSessionUser;
    init(additionalInitializers?: (() => Promise<void> | void)[]): Promise<void>;
    protected abstract fetchUser(): Promise<void>;
    signOut(): Promise<void>;
    deleteAccount(): Promise<void>;
}
//# sourceMappingURL=SignedUserManager.d.ts.map