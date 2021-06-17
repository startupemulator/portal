import { Strapi } from "@nuxtjs/strapi";

export function createCriterions($strapi: Strapi) {
  return async (mark: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createCriterion (input:{ 
          data:{ mark:3} 
        }){
        criterion {
    id}
  }
}`,
    });
    return data.createCriterion ? data.createCriterion : null;
  };
}
