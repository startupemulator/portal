import { Strapi } from "@nuxtjs/strapi";

export function createCriterions($strapi: Strapi) {
  return async (mark: string, direction: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createCriterion (input:{ 
          data:{ mark: ${mark}, direction: "${direction}"} 
        }){
        criterion {
    id
   }
  }
}`,
    });
    return data.createCriterion ? data.createCriterion.criterion : null;
  };
}
