import { Strapi } from "@nuxtjs/strapi";

export function specialisations($strapi: Strapi) {
  return () => {
    return $strapi.graphql({
      query: `query {
        specialisations {
    id
    title
  }
}`,
    });
  };
}
