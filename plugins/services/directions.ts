import { Strapi } from "@nuxtjs/strapi";

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
