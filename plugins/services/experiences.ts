import { Strapi } from "@nuxtjs/strapi";
import { Experience } from "../../models/Experience";

export interface ExperiencesServices {
  $experiences(): Promise<Partial<Experience>[]>;
}

export function experiences($strapi: Strapi) {
  return () => {
    return $strapi.graphql({
      query: `query {
  experiences(sort: "id") {
    id
    title
  }
}`,
    });
  };
}
