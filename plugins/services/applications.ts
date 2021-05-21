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
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
    applications(where:{position:{startup: "90"}}) {
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
