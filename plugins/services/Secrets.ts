import { Strapi } from "@nuxtjs/strapi";

export function secrets($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        secrets (where: {id: ${id}}) {
    id
    title
    description
  }
}`,
    });
    return data.secrets ? data.secrets[0] : null;
  };
}
export function deleteSecret($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        deleteSecret (input: {where: {id: ${id}}}) {
          secret{
              id
            }
    }
  }`,
    });
    return data.deleteSecret.secret ? data.deleteSecret.secret : null;
  };
}
export function createSecret($strapi: Strapi) {
  return async (title: string, description: string, startupId: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createSecret(input: { data: { 
          title: "${title}", description: "${description}", startup: "${startupId}"  } }) {
            secret {
           id
           title
           description
          }
        }
      }`,
    });
    return data.createSecret.secret ? data.createSecret.secret : null;
  };
}
export function updateSecret($strapi: Strapi) {
  return async (id: string, title: string, description: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateSecret(
            input: {
             where: {id: "${id}"}
             data: { title: "${title}", description: "${description}" }
             }
             ) {
              secret {
                id
                title
                description
               }
        }
      }`,
    });
    return data.updateSecret.secret ? data.updateSecret.secret : null;
  };
}
