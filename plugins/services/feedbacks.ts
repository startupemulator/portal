import { Strapi } from "@nuxtjs/strapi";

export function feedbacks($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
        feedbacks {
    id
    description
    is_public
    published_at
    criterions{
      id
    }
    badges{
      id
    }
  }
}`,
    });
    return data.feedbacks ? data.feedbacks[0] : null;
  };
}
