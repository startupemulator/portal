import { Challenge } from "../../models/Challenge";

export function createChallenge(): Challenge {
  return {
    id: "string",
    title: "string title",
    slug: "string-slug",
    description:
      "string string string string string string string string string",
    status: "string",
    author: {},
    sort: 1,
    specialisations: [],
    published_at: new Date(),
  };
}
