import { Startup } from "./Startup";

export interface Secrets {
  id: string;
  title: string;
  description: string;
  startup: Array<Startup>;
  published_at: Date;
}
