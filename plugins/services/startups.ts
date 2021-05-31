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
            positions{
              id
              status
             
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
            applications{
              id

            }
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
            invites{
              id
              email
              position{
                id
                startup{
                  id
                }
                specialisation{
                  id
                  title
                }
              }

            }
          }
          technologies {
            id
            title
          }
          sources{
            id 
            title
            link
            startups{
              id
            }
          }
          secrets{
            id
            title
            description
            startup{
              id
            }
          }
          
        }
        
      }`,
    });
    return data.startups ? data.startups[0] : null;
  };
}
export function startupById($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        startups(where: {id: "${id}"}){
          id
          title
        }
      }`,
    });
    return data.startups ? data.startups[0] : null;
  };
}
export function startupByAcceptedApplication($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        startups(where: {positions:{applications:{user: {id: "${id}"}}}}){
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
            applications{
              id
              status
              user{
                id
              }
            }
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
    return data.startups ? data.startups : null;
  };
}
export function myStartups($strapi: Strapi) {
  return async (owner: string) => {
    const data = await $strapi.graphql({
      query: `query {
        startups(where: {owner:{id: "${owner}"}}){
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
    return data.startups;
  };
}

export function deleteDraft($strapi: Strapi) {
  return async (id: string) => {
    await $strapi.graphql({
      query: `mutation {
        deleteStartup(input: { where: { id: "${id}" } }) {
          startup {
            id
          }
        }
      }`,
    });
  };
}

export function filterStartup($strapi: Strapi) {
  return async (technologies: Array<string>) => {
    const data = await $strapi.graphql({
      query: `query {
        startups(where: {technologies: {id_contains: [${technologies}]}}){
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
            positions{
              id
              status
             
            }
            
          }
      }`,
    });
    return data.startups;
  };
}
