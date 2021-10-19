import { User } from "./User";
import { Feedbacks } from "./Feedbacks";

export interface Like {
  id: string;
  challfeedbackenges: Array<Feedbacks>;
  user: Array<User>;
  published_at: Date;
}
