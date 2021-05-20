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
      mark
      direction{
        id 
        title
      }
    }
    badges{
      id
      title
      image{
        url
      }
    }
  }
}`,
    });
    return data.feedbacks ? data.feedbacks : null;
  };
}
