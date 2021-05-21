import { Strapi } from "@nuxtjs/strapi";

export function applications($strapi: Strapi) {
  return () => {
    return $strapi.graphql({
      query: `query {
    applications(sort: "id") {
    id
    status
    comment
    decline_reason
  }
}`,
    });
  };
}
