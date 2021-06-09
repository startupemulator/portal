import { NotificationUser } from "./NotificationUser";
import { Feedbacks } from "./Feedbacks";

export interface Sources {
  id: string;
  challfeedbackenges: Array<Feedbacks>;
  user: Array<NotificationUser>;
  published_at: Date;
}
