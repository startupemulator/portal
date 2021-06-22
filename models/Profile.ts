import { NotificationUser } from "./NotificationUser";
import { Technology } from "./Technology";
import { Experience } from "./Experience";

export interface Profile {
  id: string;
<<<<<<< HEAD
=======
  is_expert: boolean;
>>>>>>> main
  slug: string;
  user: Array<NotificationUser>;
  technologies: Array<Technology>;
  experience: Array<Experience>;
}
