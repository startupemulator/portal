import { Strapi } from "@nuxtjs/strapi";
export function createLike($strapi: Strapi) {
  return async (feedback: string, user: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
            createLike(input: { data: { feedback: "${feedback}",  user: "${user}" } }) {
                like {
                id
              }
            }
          }`,
    });
    return data.createLike ? data.createLike.like : null;
  };
}

export function deleteLike($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
            deleteLike(input: { where: { id: "${id}"} }) {
                  like {
                  id
                }
              }
            }`,
    });
    return data.deleteLike ? data.deleteLike.like : null;
  };
}
