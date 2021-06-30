import { Startup } from "./Startup";

export interface Releases {
  id: string;
  title: string;
  url: string;
  startup: Array<Startup>;
  published_at: Date;
}
