import { Criterions } from "./Criterions";
import { Badges } from "./Badges";

export interface Feedbacks {
  id: string;
  description: string;
  criterions: Array<Criterions>;
  badges: Array<Badges>;
  is_public: boolean;
  published_at: string;
}
