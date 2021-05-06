import { Strapi } from "@nuxtjs/strapi";

export function startups($strapi: Strapi) {
  return () => {
    return $strapi.graphql({
      query: `
        query {
          startups {
            id
            title
            slug
            description
            start_date
            duration
            state
            owner {
              id
              name
            }
            technologies {
              id
              title
            }
          }
        }`,
    });
  };
}
