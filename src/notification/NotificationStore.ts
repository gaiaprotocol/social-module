import { SupabaseService } from "common-app-module";

export default class NotificationStore<T> extends SupabaseService<T> {
  public async fetchNotification(id: number) {
    return await this.safeSelectSingle((b) => b.eq("id", id));
  }

  public async fetchNotifications(userId: string) {
    return await this.safeSelect((b) =>
      b.eq("user_id", userId).order("id", { ascending: false })
    );
  }
}
