import { Technology } from "./Technology";
import { Challenge } from "./Challenge";
import { Startup } from "./Startup";

export interface AskFeedbacks {
  id: string;
  comment: string;
  technologies: Array<Technology>;
  challenge: Array<Challenge>;
  startup: Array<Startup>;
}
