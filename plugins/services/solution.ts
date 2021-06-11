import { Strapi } from "@nuxtjs/strapi";

export function solutions($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        solutions (where: {id: ${id}}) {
    id
    title
    url
  }
}`,
    });
    return data.solutions ? data.solutions[0] : null;
  };
}
export function deleteSolution($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        deleteSolution (input: {where: {id: ${id}}}) {
          solution{
              id
            }
    }
  }`,
    });
    return data.deleteSolution.solution ? data.deleteSolution.solution : null;
  };
}
export function createSolution($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `mutation {
        createSolution(input: { data: { title: ""} } ) {
          solution {
           id
           
          }
        }
      }`,
    });
    return data.createSolution.solution ? data.createSolution.solution : null;
  };
}
export function updateSolution($strapi: Strapi) {
  return async (id: string, title: string, url: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateSolution(
            input: {
             where: {id: "${id}"}
             data: { title: "${title}", url: "${url}"  }
             }
             ) {
              solution {
                id
                title
                url
               }
        }
      }`,
    });
    return data.updateSolution.solution ? data.updateSolution.solution : null;
  };
}
