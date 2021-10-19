import { Strapi } from "@nuxtjs/strapi";
import { Like } from "~/models/Like";

export interface LikesServices {
  $createLike(feedback: string, user: string): Promise<Partial<Like>>;

  $deleteLike(id: string): Promise<Partial<Like>>;
}

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
