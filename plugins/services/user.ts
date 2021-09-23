import { Strapi } from "@nuxtjs/strapi";

export function users($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
  users {
    id
    email  
  }
}`,
    });
    return data.users;
  };
}
export function getUserByEmail($strapi: Strapi) {
  return async (email: string) => {
    const data = await $strapi.graphql({
      query: `query {
  users (where: {email: "${email}"}) {
    id
    
  }
}`,
    });
    return data.users ? data.users[0] : null;
  };
}
export function createUser($strapi: Strapi) {
  return async (email: string, password: String) => {
    const data = await $strapi.graphql({
      query: `mutation {
        register(input: { email: "${email}",  password: "${password}" }) {
          jwt
          user {
            id
            email
          }
        }
      }`,
    });
    return data || null;
  };
}

export function updateUser($strapi: Strapi) {
  return async (id: string, username: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateUser(
          input: {
          where: {id: "${id}" }
          data: { username: "${username}"}
         }
         ) {
            user {
              username
              email
            }
        }
      }`,
    });
    return data.updateUser ? data.updateUser.user : null;
  };
}
export function updateUserPassword($strapi: Strapi) {
  return async (id: string, password: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateUser(
          input: {
          where: {id: "${id}" }
          data: { password: "${password}"}
         }
         ) {
            user {
              email
            }
        }
      }`,
    });
    return data.updateUser ? data.updateUser.user : null;
  };
}

export function emailConfirmation($strapi: Strapi) {
  return async (token: string) => {
    const data = await $strapi.graphql({
      query: `mutation  {
        emailConfirmation(confirmation: "${token}"){
          jwt
          user{
            id
          }
        }
}`,
    });
    return data.emailConfirmation ? data.emailConfirmation : null;
  };
}
