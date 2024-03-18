import { EventContainer, Supabase } from "@common-module/app";
import SocialUserPublic from "../database-interface/SocialUserPublic.js";
import FCM from "../fcm/FCM.js";
import FCMTopicSubscribeManager from "../fcm/FCMTopicSubscribeManager.js";
import FollowService from "../follow/FollowService.js";

export default abstract class SignedUserManager<UT extends SocialUserPublic>
  extends EventContainer {
  public user: UT | undefined;

  public get signed() {
    return this.user !== undefined;
  }

  constructor() {
    super();
    this.addAllowedEvents("walletLinked");
  }

  public async init(fetchTopics: boolean, fetchFollows: boolean) {
    const { data, error } = await Supabase.client.auth.getSession();
    if (error) throw error;
    const sessionUser = data?.session?.user;
    if (sessionUser) {
      [this.user] = await Promise.all([
        this.fetchUser(sessionUser.id),
        fetchTopics
          ? FCMTopicSubscribeManager.loadSignedUserSubscribedTopics(
            sessionUser.id,
          )
          : undefined,
        fetchFollows
          ? FollowService.fetchSignedUserFollows(sessionUser.id)
          : undefined,
      ]);
      FCM.requestPermissionAndSaveToken();
    }
  }

  protected abstract fetchUser(
    userId: string,
  ): Promise<UT | undefined>;

  public async signOut() {
    await Supabase.signOut();
    location.reload();
  }

  public async deleteAccount() {
    const { error } = await Supabase.client.functions.invoke("delete-account");
    if (error) throw error;
    this.signOut();
  }
}
