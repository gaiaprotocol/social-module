import { Store, Supabase } from "@common-module/app";
import { DomChild } from "@common-module/app/lib/dom/DomNode.js";
import { RealtimeChannel } from "@supabase/supabase-js";
import SocialComponent from "../SocialComponent.js";

export interface NotificationListOptions {
  userId: string;
  tableName: string;
  storeName: string;
  emptyMessage: string;
}

export default abstract class NotificationList<T> extends SocialComponent {
  protected store: Store;
  private channel: RealtimeChannel;

  constructor(
    tag: string,
    options: NotificationListOptions,
    initialLoadingAnimation: DomChild,
  ) {
    super(tag + ".notification-list");
    this.store = new Store(options.storeName);
    this.domElement.setAttribute("data-empty-message", options.emptyMessage);

    const cachedNotifications = this.store.get<T[]>("cached-notifications");
    if (cachedNotifications && cachedNotifications.length > 0) {
      for (const notification of cachedNotifications) {
        this.addNotificationItem(notification, false);
      }
    } else {
      this.append(initialLoadingAnimation);
    }

    setTimeout(() => this.refresh());

    this.channel = Supabase.client
      .channel(`${options.tableName}-changes`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: options.tableName,
          filter: "user_id=eq." + options.userId,
        },
        async (payload: any) => {
          const notification = await this.fetchNotification(payload.new.id);
          if (notification) {
            const cachedNotifications =
              this.store.get<T[]>("cached-notifications") ?? [];
            cachedNotifications.push(notification);
            this.store.set("cached-notifications", cachedNotifications, true);
            this.addNotificationItem(notification, true);
          }
        },
      )
      .subscribe();
  }

  protected abstract addNotificationItem(notification: T, isNew: boolean): void;

  protected abstract fetchNotification(id: number): Promise<T | undefined>;
  protected abstract fetchNotifications(): Promise<T[]>;

  private async refresh() {
    this.addClass("loading");

    const notifications = await this.fetchNotifications();

    this.store.set("cached-notifications", notifications, true);

    if (!this.deleted) {
      this.deleteClass("loading");
      for (const notification of notifications) {
        this.addNotificationItem(notification, false);
      }
    }
  }

  public delete() {
    this.channel.unsubscribe();
    super.delete();
  }
}
