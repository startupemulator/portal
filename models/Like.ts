import { NotificationUser } from "./NotificationUser";
import { Feedbacks } from "./Feedbacks";

export interface Like {
  id: string;
  challfeedbackenges: Array<Feedbacks>;
  user: Array<NotificationUser>;
  published_at: Date;
}
