import { Challenge } from "./Challenge";
import { Startup } from "./Startup";

export interface Sources {
  id: string;
  title: string;
  link: string;
  owner: string;
  challenges: Array<Challenge>;
  startup: Array<Startup>;
  published_at: Date;
}
