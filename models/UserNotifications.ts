import { NotificationUser } from "./NotificationUser";
import { Notification } from "./Notification";
export interface UserNotification {
  id: string;
  user: Array<NotificationUser>;
  notification: Array<Notification>;
  viewed: boolean;
  notified_at: string;
  viewed_at: string;
  published_at: string;
}
