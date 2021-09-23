import { Strapi } from "@nuxtjs/strapi";

export function login($strapi: Strapi) {
  return async (identifier: string, password: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        login(input: { identifier: "${identifier}", password: "${password}" }) {
          jwt
          user {
            id
            email
            profile{
              name
            }
          }
        }
      }`,
    });
    return data;
  };
}

export function sendLoginLink($strapi: Strapi) {
  return async (email: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        sendLoginLink(email: "${email}"){
          sent
          email
        }
      }`,
    });
    return data ? data.sendLoginLink : null;
  };
}
export function loginPasswordless($strapi: Strapi) {
  return async (token: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        loginPasswordless(loginToken: "${token}"){
          jwt
          user {
            id
            confirmed
            email
            }
        }
      }`,
    });
    return data ? data.loginPasswordless : null;
  };
}
