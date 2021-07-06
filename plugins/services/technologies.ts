import { Strapi } from "@nuxtjs/strapi";

export function technologies($strapi: Strapi) {
  return (isPublic: boolean = true) => {
    return $strapi.graphql({
      query: `query {
  technologies (where: {is_public: ${isPublic ? "true" : "false"}}) {
    id
    title
    is_public
   
  }
}`,
    });
  };
}
export function myTechnologies($strapi: Strapi) {
  return async (creator: string) => {
    const data = await $strapi.graphql({
      query: `query {
  technologies (where: {creator_id: "${creator}"}) {
    id
    title
    creator_id
  }
}`,
    });
    return data.technologies ? data.technologies : null;
  };
}
export function createTechnologies($strapi: Strapi) {
  return async (creator: number, title: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createTechnology(
          input: {
            data: {
              title:  "${title}", creator_id: ${creator}
            }
          }
        ) {
            technology {
              id
              creator_id
              title
            }
    
  }
}`,
    });
    return data.createTechnology ? data.createTechnology.technology : null;
  };
}
