import { Strapi } from "@nuxtjs/strapi";

export function startups($strapi: Strapi) {
  return (states: string[] = ["in_progress", "not_started", "finished"]) => {
    return $strapi.graphql({
      query: `
        query {
          startups (where: {state_in:[${states
            .map((i) => `"${i}"`)
            .join(",")}]}){
            id
            title
            slug
            description
            start_date
            duration
            state
            owner {
              id
              name
            }
            technologies {
              id
              title
            }
            
          }
        }`,
    });
  };
}
export function startup($strapi: Strapi) {
  return async (slug: string) => {
    const data = await $strapi.graphql({
      query: `query {
        startups(where: {slug: "${slug}"}){
          id
          title
          slug
          description
          start_date
          duration
          state
          positions {
            id
            sort
            status
            specialisation {
              id
              title
            }
            technologies{
              id
              title
            }
          }
          owner {
            id
            name
          }
          technologies {
            id
            title
          }
          
        }
        
      }`,
    });
    return data.startups ? data.startups[0] : null;
  };
}
