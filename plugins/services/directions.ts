import { Strapi } from "@nuxtjs/strapi";
import { Directions } from "~/models/Directions";

export interface DirectionsServices {
  $directions(): Promise<Partial<Directions>[]>;
}

export function directions($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
        directions {
    id
    title
    comment
  }
}`,
    });
    return data.directions ? data.directions : null;
  };
}
