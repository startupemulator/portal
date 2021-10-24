import { Strapi } from "@nuxtjs/strapi";
import { User } from "../../models/User";

interface NuxtStrapiLoginData {
  /**
   * Can be either the email or the username set by the user.
   * */
  identifier: string;
  password: string;
}

interface NuxtStrapiLoginResult {
  user: User;
  jwt: string;
}

export interface LoginServices {
  $login(data: NuxtStrapiLoginData): Promise<NuxtStrapiLoginResult>;

  $sendLoginLink(email: NuxtStrapiLoginData): Promise<NuxtStrapiLoginResult>;

  $loginPasswordless(token: string): Promise<NuxtStrapiLoginResult>;
}

export function login($strapi: Strapi) {
  return async (identifier: string, password: string) => {
    return await $strapi.graphql({
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
