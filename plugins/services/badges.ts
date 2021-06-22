import { Strapi } from "@nuxtjs/strapi";

export function badges($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
        badges {
    id
    title
    type
    description
    image{
      id
      url
    }
    feedbacks{
      id
      request{
        id
      }
    }
  }
}`,
    });
    return data.badges ? data.badges : null;
  };
}
