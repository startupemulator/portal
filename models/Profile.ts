import { NotificationUser } from "./NotificationUser";
import { Technology } from "./Technology";
import { Experience } from "./Experience";

export interface Profile {
  id: string;
  slug: string;
  user: Array<NotificationUser>;
  technologies: Array<Technology>;
  experience: Array<Experience>;
}
