import { Strapi } from "@nuxtjs/strapi";
import { Links } from "../../models/Links";

export interface LinksServices {
  $links(id: string): Promise<Partial<Links>[]>;

  $deleteLink(id: string): Promise<Partial<Links>>;

  $createLink(title: string, url: string): Promise<Partial<Links>>;

  $updateLink(id: string, title: string, url: string): Promise<Partial<Links>>;
}

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
