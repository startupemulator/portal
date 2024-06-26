import { Strapi } from "@nuxtjs/strapi";
import { data } from "autoprefixer";
import { Startup } from "../../models/Startup";

export interface StartupsServices {
  $startups(states?: string[]): Promise<{ startups: Partial<Startup>[] }>;

  $addTechnologiesStartup(
    id: string[],
    technologies: Array<string>
  ): Promise<Partial<Startup>[]>;

  $myStartups(states: string[]): Promise<Partial<Startup>[]>;

  $deleteDraft(states: string[]): Promise<Partial<Startup>>;
  $createStartup(
    date: string,
    description: string,
    duration: string,
    title: string,
    owner: string
  ): Promise<Partial<Startup>>;

  $startup(slug: string): Promise<Partial<Startup>>;

  $startupById(id: string[]): Promise<Partial<Startup>>;

  $startupByAcceptedApplication(id: string[]): Promise<Partial<Startup>>;

  $updateStartupInfo(
    id: string,
    date: string,
    description: string,
    duration: string,
    title: string
  ): Promise<Partial<Startup>[]>;

  $finishStartup(id: string): Promise<Partial<Startup>[]>;

  $updateStateStartup(
    id: string,
    state: string,
    date: string
  ): Promise<Partial<Startup>[]>;

  $filterStartup(id: Array<string>): Promise<Partial<Startup>>;
}

export function startups($strapi: Strapi) {
  return (states: string[] = ["in_progress", "not_started", "finished"]) => {
    return $strapi.graphql({
      query: `
        query {
          startups (sort: "start_date:desc", where: {state_in:[${states
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
export function startupByAcceptedApplication($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        startups(sort: "start_date:desc", where: {positions:{applications:{user: {id: "${id}"}}}}){
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
        startups(sort: "start_date:desc",
         where: {owner:{id: "${owner}"}, state_ncontains: "removed"}){
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
    const data = await $strapi.graphql({
      query: `mutation {
        updateStartup (
          input: {
          where: {id: "${id}" }
          data: {state: removed}
         }
         ) {
          startup {
            id
            state
          }
        }
      }`,
    });
    return data.updateStartup ? data.updateStartup.startup : null;
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
  return async (
    technologies: Array<string>,
    states: string[] = ["in_progress", "not_started", "finished"]
  ) => {
    const data = await $strapi.graphql({
      query: `query {
        startups(sort: "start_date:desc",
         where: {technologies: {id_eq: [${technologies}]}, state_in:[${states
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
             title: "${title}",
             duration: ${duration},
             start_date: "${date}",}
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

export function createStartup($strapi: Strapi) {
  return async (
    date: string,
    description: string,
    duration: string,
    title: string,
    owner: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createStartup (
          input: {
          data: {
            description: "${description}",
             title: "${title}" ,
             duration: ${duration},
             start_date: "${date}",
             owner: "${owner}"
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
    return data.createStartup ? data.createStartup.startup : null;
  };
}
