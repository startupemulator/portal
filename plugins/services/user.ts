import { Strapi } from "@nuxtjs/strapi";

export function users($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
  users {
    id
    username
    email  
  }
}`,
    });
    return data.users;
  };
}
export function getUserBySlug($strapi: Strapi) {
  return async (slug: string) => {
    const data = await $strapi.graphql({
      query: `query {
  users (where: {name: "${slug}"}) {
    id
    username 
    
    
    
  }
}`,
    });
    return data.users ? data.users[0] : null;
  };
}
export function createUser($strapi: Strapi) {
  return async (email: string, name: string, password: String) => {
    const data = await $strapi.graphql({
      query: `mutation {
        register(input: { username: "${name}", email: "${email}",  password: "${password}" }) {
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
              username
              email
            }
        }
      }`,
    });
    return data.updateUser ? data.updateUser.user : null;
  };
}
