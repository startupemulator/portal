import { Strapi } from "@nuxtjs/strapi";

export function applications($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
    applications {
    id
    status
    comment
    decline_reason
    user{
      id
      username
      email
    }
    position{
      id
    }
  }
}`,
    });
    return data;
  };
}
export function applicationsByStartupId($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
    applications(where:{position:{startup: "${id}"}}) {
    id
    status
    comment
    decline_reason
    position{
      id
      status
      startup{
        id
      }
      specialisation{
        id
        title
      }
      applications{
        id
        status
        decline_reason
        user {
          id
          username
          profile{
            id 
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
    }
  }
}`,
    });
    return data;
  };
}

export function applicationAdvancedAccess($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateApplication(
          input: {
          where: {id: "${id}" }
          data: { status: advanced}
         }
         ) {
          application {
              id
            }
        }
      }`,
    });
    return data;
  };
}
export function applicationAccept($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateApplication(
          input: {
          where: {id: "${id}" }
          data: { status: accepted}
         }
         ) {
          application {
              id
            }
        }
      }`,
    });
    return data;
  };
}
export function applicationDecline($strapi: Strapi) {
  return async (id: string, declineReason: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateApplication(
          input: {
          where: {id: "${id}" }
          data: {status: declined, decline_reason: "${declineReason}"}
         }
         ) {
          application {
              id
              comment
              decline_reason
            }
        }
      }`,
    });
    return data;
  };
}
