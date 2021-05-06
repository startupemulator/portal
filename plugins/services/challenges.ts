import { Strapi } from "@nuxtjs/strapi";

export function challenges($strapi: Strapi) {
  return () => {
    return $strapi.graphql({
      query: `query {
        challenges (sort:"id:asc") {
          id
          title
          sort
          description
          difficulty
          slug
          status
          specialisations {
            id
            title
          }
          author {
            id
            name
            username

          }
          sources {
            link
            title
          }
        }
      }`,
    });
  };
}
