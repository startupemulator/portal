import { Strapi } from "@nuxtjs/strapi";

export function technologies($strapi: Strapi) {
  return (isPublic: boolean = true) => {
    return $strapi.graphql({
      query: `query {
  technologies (where: {is_public: ${isPublic ? "true" : "false"}}) {
    id
    title
    is_public
  }
}`,
    });
  };
}
