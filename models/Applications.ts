import { NotificationUser } from "./NotificationUser";

export interface Applications {
  id: string;
  user: Array<NotificationUser>;
  position: any[];
  status: string;
  comment: string;
  decline_reason: string;
}
