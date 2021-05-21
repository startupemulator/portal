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
