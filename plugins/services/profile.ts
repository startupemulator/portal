import { Strapi } from "@nuxtjs/strapi";

export function profile($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
  profiles(where:{user:{id: "${id}"}}) {
      user {
        id
      }
      technologies{
        id
        title
      }
      experience {
        id 
        title
      }
  }
}`,
    });
    return data.profiles ? data.profiles[0] : null;
  };
}
