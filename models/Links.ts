import { Startup } from "./Startup";

export interface Links {
  id: string;
  title: string;
  url: string;
  startup: Array<Startup>;
  published_at: Date;
}
