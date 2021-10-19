import { User } from "./User";
import { Technology } from "./Technology";
import { Experience } from "./Experience";

export interface Profile {
  id: string;
  is_expert: boolean;
  slug: string;
  name: string;
  user: User;
  technologies: Array<Technology>;
  experience: Experience;
}
