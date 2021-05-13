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
    return data.users ? data.users[0] : null;
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
