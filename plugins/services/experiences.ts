import { Strapi } from "@nuxtjs/strapi";

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
