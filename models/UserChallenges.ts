import { Challenge } from "./Challenge";

export interface userChallenges {
  user: string;
  estimation: 0;
  challenge: Array<Challenge>;
  created_by: string;
  updated_by: string;
}
