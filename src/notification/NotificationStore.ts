import { SupabaseService } from "common-app-module";

export default class NotificationStore<T> extends SupabaseService {
  public async fetchNotifications(userId: string) {
    const data = await this.safeFetch<T[]>((b) =>
      b.select(this.selectQuery).limit(this.fetchLimit).eq(
        "user_id",
        userId,
      ).order(
        "created_at",
        { ascending: false },
      )
    );
    return data ?? [];
  }
}
