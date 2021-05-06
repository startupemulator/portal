import { Strapi } from "@nuxtjs/strapi";

export function testimonials($strapi: Strapi) {
  return () => {
    return $strapi.graphql({
      query: `query {
  testimonials {
    id
    comment
    author
    title
    photo {
      url
    }
  }
}`,
    });
  };
}
