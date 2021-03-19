import { NotificationUser } from "./NotificationUser";
export interface Notification {
  id: string;
  user: Array<NotificationUser>;
}
