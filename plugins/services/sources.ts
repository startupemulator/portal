import { Strapi } from "@nuxtjs/strapi";
import { Sources } from "../../models/Sources";

export interface SourcesServices {
  $sources(id: string): Promise<Partial<Sources>[]>;

  $deleteSource(id: string): Promise<Partial<Sources>>;

  $createSource(
    title: string,
    link: string,
    startupId: string
  ): Promise<Partial<Sources>>;

  $createSourceForChallenge(
    title: string,
    link: string
  ): Promise<Partial<Sources>>;

  $updateSource(
    id: string,
    title: string,
    link: string
  ): Promise<Partial<Sources>>;
}

export function sources($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        sources (where: {id: ${id}}) {
    id
    title
    link
  }
}`,
    });
    return data.sources ? data.sources[0] : null;
  };
}
export function deleteSource($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        deleteSource (input: {where: {id: ${id}}}) {
          source{
              id
            }
    }
  }`,
    });
    return data.deleteSource.source ? data.deleteSource.source : null;
  };
}
export function createSource($strapi: Strapi) {
  return async (title: string, link: string, startupId: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createSource(input: { data: {
          title: "${title}", link: "${link} ", startups:"${startupId}" } }) {
            source {
           id
           title
           link
          }
        }
      }`,
    });
    return data.createSource.source ? data.createSource.source : null;
  };
}
export function createSourceForChallenge($strapi: Strapi) {
  return async (title: string, link: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createSource(input: { data: {
          title: "${title}", link: "${link} " } }) {
            source {
           id
           title
           link
          }
        }
      }`,
    });
    return data.createSource.source ? data.createSource.source : null;
  };
}
export function updateSource($strapi: Strapi) {
  return async (id: string, title: string, link: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateSource(
            input: {
             where: {id: "${id}"}
             data: { title: "${title}", link: "${link}"  }
             }
             ) {
              source {
                id
                title
                link
               }
        }
      }`,
    });
    return data.updateSource.source ? data.updateSource.source : null;
  };
}
