import { AskFeedbacks } from "./AskFeedbacks";

export interface Solutions {
  id: string;
  title: string;
  url: string;
  request: Array<AskFeedbacks>;
  published_at: string;
}
