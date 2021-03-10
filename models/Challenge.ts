import { Specialisation } from "./Specialisation";

export interface Challenge {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  sort: number;
  author: any;
  specialisations: Array<Specialisation>;
  published_at: Date;
}
