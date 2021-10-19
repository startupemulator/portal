import { Strapi } from "@nuxtjs/strapi";
import { Applications } from "~/models/Applications";

export interface ApplicationsServices {
  $applications(): Promise<Partial<Applications>[]>;

  $applicationsByStartupId(id: string): Promise<Partial<Applications>[]>;

  $cancelApplication(id: string): Promise<Partial<Applications>>;

  $applicationAccept(id: string): Promise<Partial<Applications>>;

  $applicationAdvancedAccess(id: string): Promise<Partial<Applications>>;

  $applicationDecline(
    id: string,
    declineReason: string
  ): Promise<Partial<Applications>>;
}

export function applications($strapi: Strapi) {
  return async () => {
    return await $strapi.graphql({
      query: `query {
    applications {
    id
    status
    comment
    decline_reason
    user{
      id
      email
      profile{
        name
        slug
      }
    }
    position{
      id
    }
  }
}`,
    });
  };
}
export function applicationsByStartupId($strapi: Strapi) {
  return async (id: string) => {
    return await $strapi.graphql({
      query: `query {
    applications(where:{position:{startup: "${id}"}}) {
    id
    status
    comment
    decline_reason
    user {
      id
    }
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
    }
  }
}`,
    });
  };
}
export function applicationAdvancedAccess($strapi: Strapi) {
  return async (id: string) => {
    return await $strapi.graphql({
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
  };
}
export function applicationAccept($strapi: Strapi) {
  return async (id: string) => {
    return await $strapi.graphql({
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
  };
}
export function applicationDecline($strapi: Strapi) {
  return async (id: string, declineReason: string) => {
    return await $strapi.graphql({
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
  };
}
export function cancelApplication($strapi: Strapi) {
  return async (id: string) => {
    return await $strapi.graphql({
      query: `mutation {
        deleteApplication(
          input: {
          where: {id: "${id}" }
         }
         ) {
          application {
              id
            }
        }
      }`,
    });
  };
}
