import { Strapi } from "@nuxtjs/strapi";

export function releases($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        releases (where: {startup: {id: ${id}}} ) {
    id
    title
    url
  }
}`,
    });
    return data.releases ? data.releases[0] : null;
  };
}
export function deleteRelease($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        deleteRelease (input: {where: {id: ${id}}}) {
          release{
              id
            }
    }
  }`,
    });
    return data.deleteReleases.release ? data.deleteReleases.release : null;
  };
}
export function createRelease($strapi: Strapi) {
  return async (title: string, url: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createRelease(input: { data: { 
          title: "${title}", url: [${url}]  } }) {
            release {
           id
           title
           url
          }
        }
      }`,
    });
    return data.createRelease.release ? data.createRelease.release : null;
  };
}
export function updateRelease($strapi: Strapi) {
  return async (id: string, title: string, url: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateRelease(
            input: {
             where: {id: "${id}"}
             data: { title: "${title}", url: [${url}]  }
             }
             ) {
              release {
                id
                title
                url
               }
        }
      }`,
    });
    return data.updateRelease.release ? data.updateRelease.release : null;
  };
}
