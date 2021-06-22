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
    mark
   }
  }
}`,
    });
    return data.createCriterion ? data.createCriterion.criterion : null;
  };
}
export function updateCriterions($strapi: Strapi) {
  return async (id: string, mark: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateCriterion (input:{ 
          where: {id: "${id}"}
          data:{ mark: ${mark}} 
        }){
        criterion {
    id
   }
  }
}`,
    });
    return data.updateCriterion ? data.updateCriterion.criterion : null;
  };
}
export function deleteCriterions($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        deleteCriterion (input:{ 
          where: {id: "${id}"}
        }){
        criterion {
    id
   }
  }
}`,
    });
    return data ? data.deleteCriterion : null;
  };
}
