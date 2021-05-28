import { Strapi } from "@nuxtjs/strapi";

export function links($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        links (where: {id: ${id}}) {
    id
    title
    url
  }
}`,
    });
    return data.links ? data.links[0] : null;
  };
}
export function deleteLink($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        deleteLink (input: {where: {id: ${id}}}) {
            link{
              id
            }
    }
  }`,
    });
    return data.deleteLink.link ? data.deleteLink.link : null;
  };
}
export function createLink($strapi: Strapi) {
  return async (title: string, url: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createLink(input: { data: { 
          title: "${title}", url: [${url}]  } }) {
          link {
           id
           title
           url
          }
        }
      }`,
    });
    return data.createLink.link ? data.createLink.link : null;
  };
}
export function updateLink($strapi: Strapi) {
  return async (id: string, title: string, url: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateLink(
            input: {
             where: {id: "${id}"}
             data: { title: "${title}", url: [${url}]  }
             }
             ) {
              link {
                id
                title
                url
               }
        }
      }`,
    });
    return data.updateLink.link ? data.updateLink.link : null;
  };
}