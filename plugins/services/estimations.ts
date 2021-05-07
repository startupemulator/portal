import { Strapi } from "@nuxtjs/strapi";

export function estimations($strapi: Strapi) {
  return () => {
    return $strapi.graphql({
      query: `query {
  estimations(sort: "id") {
    id
    title
    value
  }
}`,
    });
  };
}
