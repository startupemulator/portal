import { Strapi } from "@nuxtjs/strapi";

export function notifications($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
        notifications {
    id
    user{
      id
    }
  }
}`,
    });
    return data;
  };
}
