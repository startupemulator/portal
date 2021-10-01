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
            applications{
              id
              status
              decline_reason
              user {
                id
                email
                profile{
                  id
                  name
                  slug 
                  technologies{
                    id
                    title
                  }
                  experience{
                    id 
                    title
                  }
                } 
              }

            }
            specialisation {
              id
              title
            }
            technologies{
              id
              title
              is_public
            }
          }
          owner {
            id
            profile{
              name
              slug
            }
            invites{
              id
              email
              is_expert
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
              decline_reason
              user {
                id
                email
                profile{
                  id 
                  name
                  slug
                  technologies{
                    id
                    title
                  }
                  experience{
                    id 
                    title
                  }
                } 
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
            profile{
              name
              slug
            }
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
            profile{
              name
              slug
            }
            
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
  return async (
    owner: string,
    states: string[] = ["in_progress", "not_started", "finished"]
  ) => {
    const data = await $strapi.graphql({
      query: `query { 
        startups(where: {owner:{id: "${owner}"}, state_ncontains: "removed"}){
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
            profile{
              name
              slug
            }
            
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
        updateStartup (
          input: {
          where: {id: "${id}" }
          data: {state: removed}
         }
         ) {
          startup {
            id
          }
        }
      }`,
    });
  };
}
export function updateStateStartup($strapi: Strapi) {
  return async (id: string, state: string, date: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateStartup (
          input: {
          where: {id: "${id}" }
          data: {state: ${state}, start_date:"${date}"}
         }
         ) {
          startup{
            id 
            start_date
            }
          }
        }`,
    });
    return data.updateStartup ? data.updateStartup.startup : null;
  };
}

export function finishStartup($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateStartup (
          input: {
          where: {id: "${id}" }
          data: {state: finished}
         }
         ) {
          startup{
            id
            state 
            }
          }
        }`,
    });
    return data.updateStartup ? data.updateStartup.startup : null;
  };
}
export function addTechnologiesStartup($strapi: Strapi) {
  return async (id: string, technologies: Array<string>) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateStartup (
          input: {
          where: {id: "${id}" }
          data: {technologies: [${technologies}]}
         }
         ) {
          startup{
            id
            technologies{
              id
            }
            }
          }
        }`,
    });
    return data.updateStartup ? data.updateStartup.startup : null;
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
              profile{
                name
                slug
              }
              
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

export function updateStartupInfo($strapi: Strapi) {
  return async (
    id: string,
    date: string,
    description: string,
    duration: string,
    title: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateStartup (
          input: {
          where: {id: "${id}" }
          data: { 
            description: "${description}",
             title: "${title}" ,
             duration: ${duration},
             start_date: "${date}",
            }
         }
         ) {
          startup {
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
              decline_reason
              user {
                id
                email
                profile{
                  id 
                  name
                  slug
                  technologies{
                    id
                    title
                  }
                  experience{
                    id 
                    title
                  }
                } 
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
            profile{
              name
              slug
            }
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
      } 
      }`,
    });
    return data.updateStartup ? data.updateStartup.startup : null;
  };
}
