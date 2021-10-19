import { User } from "./User";

export interface Applications {
  id: string;
  user: Array<User>;
  position: any[];
  status: string;
  comment: string;
  decline_reason: string;
}
