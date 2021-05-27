import { Startup } from "./Startup";
import { Technology } from "./Technology";
import { Specialisation } from "./Specialisation";
import { Applications } from "./Applications";
export interface Positions {
  id: string;
  status: "open";
  startup: Array<Startup>;
  technologies: Array<Technology>;
  specialisation: Array<Specialisation>;
  applications: Array<Applications>;
}
