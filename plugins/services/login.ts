import { Strapi } from "@nuxtjs/strapi";

export function login($strapi: Strapi) {
  return async (identifier: string, password: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        login(input: { identifier: "${identifier}", password: "${password}" }) {
          jwt
          user {
            username
            email
          }
            
        }
        
      }`,
    });
    return data;
  };
}
