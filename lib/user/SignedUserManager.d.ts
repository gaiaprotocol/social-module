import { EventContainer } from "@common-module/app";
import SocialUserPublic from "../database-interface/SocialUserPublic.js";
export default abstract class SignedUserManager<UT extends SocialUserPublic> extends EventContainer {
    user: UT | undefined;
    get signed(): boolean;
    constructor();
    init(fetchTopics: boolean, fetchFollows: boolean, initializers?: Promise<void>[]): Promise<void>;
    protected abstract fetchUser(userId: string): Promise<UT | undefined>;
    signOut(): Promise<void>;
    deleteAccount(): Promise<void>;
}
//# sourceMappingURL=SignedUserManager.d.ts.map