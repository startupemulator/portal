export interface Startup {
  id: string;
  title: string;
  slug: string;
  description: string;
  full_info: string;
  start_date: Date;
  duration: number;
  state:string;
  technologies: any[];
  sources: any[];
  secrets: any[];
  applications: any[];
  published_date: Date;
}
