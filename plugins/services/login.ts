import { Strapi } from "@nuxtjs/strapi";

export function login($strapi: Strapi) {
  return async (email: string, password: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        login(input: { identifier: "v.marwork@gmail.com", password: "JF932jd9j" }) {
            jwt
        }
      }`,
    });
    return data;
  };
}
