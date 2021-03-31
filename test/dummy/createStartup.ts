import { Startup } from "../../models/Startup";

export function createStartup(): Startup {
  return {
    id: "string",
    title: "string title",
    slug: "string-slug",
    description:
      "string string string string string string string string string",
    full_info: " string string string string string string string",
    start_date: new Date(),
    duration: 10,
    technologies: [],
    sources: [],
    secrets: [],
    applications: [],
    published_date: new Date(),
  };
}
