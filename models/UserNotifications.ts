import { User } from "./User";
import { Notification } from "./Notification";
export interface UserNotification {
  id: string;
  user: Array<User>;
  notification: Array<Notification>;
  viewed: boolean;
  notified_at: string;
  viewed_at: string;
  published_at: string;
}
