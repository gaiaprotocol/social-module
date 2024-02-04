import { EventContainer } from "@common-module/app";
import SocialUserPublic from "../database-interface/SocialUserPublic.js";
export default abstract class SignedUserManager<UT extends SocialUserPublic> extends EventContainer {
    user: UT | undefined;
    get signed(): boolean;
    constructor();
    fetchUserOnInit(): Promise<void>;
    fetchUserAndFollowsOnInit(): Promise<void>;
    protected abstract fetchUser(userId: string): Promise<UT | undefined>;
    signOut(): Promise<void>;
}
//# sourceMappingURL=SignedUserManager.d.ts.map