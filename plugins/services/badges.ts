import { Strapi } from "@nuxtjs/strapi";
import { Badges } from "~/models/Badges";

export interface BadgesServices {
  $badges(): Promise<Partial<Badges>[]>;
}

export function badges($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
        badges {
    id
    title
    type
    description
    image{
      id
      url
    }
    feedbacks{
      id
      request{
        id
      }
    }
  }
}`,
    });
    return data.badges ? data.badges : null;
  };
}
