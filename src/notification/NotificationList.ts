import { RealtimeChannel } from "@supabase/supabase-js";
import { ListLoadingBar, Store, Supabase } from "common-app-module";
import { DomChild } from "common-app-module/lib/dom/DomNode.js";
import SoFiComponent from "../SoFiComponent.js";

export interface NotificationListOptions {
  userId: string;
  tableName: string;
  storeName: string;
  emptyMessage: string;
}

export default abstract class NotificationList<T> extends SoFiComponent {
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
        this.addNotificationItem(notification);
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
        (payload: any) => {
          console.log(payload);
          //TODO:
        },
      )
      .subscribe();
  }

  protected abstract addNotificationItem(notification: T): void;

  protected abstract fetchNotifications(): Promise<T[]>;

  private async refresh() {
    this.append(new ListLoadingBar());

    const notifications = await this.fetchNotifications();

    this.store.set("cached-notifications", notifications, true);

    if (!this.deleted) {
      this.empty();
      for (const notification of notifications) {
        this.addNotificationItem(notification);
      }
    }
  }

  public delete() {
    this.channel.unsubscribe();
    super.delete();
  }
}
