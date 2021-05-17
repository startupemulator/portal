import { Strapi } from "@nuxtjs/strapi";

export function profile($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
  profiles(where:{user:{id: "${id}"}}) {
      id
    user {
        id
        username
        email
        provider
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

export function updateProfile($strapi: Strapi) {
  return async (
    id: string,
    technologies: Array<string>,
    experience: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateProfile(
          input: {
          where: {id: "${id}" }
          data: { technologies: [${technologies}],  experience: "${experience}"} }) {
          profile {
            id
            user {
                id
                username
                email
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
          
        }
      }`,
    });
    return data.updateProfile.profile;
  };
}
export function createProfile($strapi: Strapi) {
  return async (id: string, technologies: Array<string>) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createProfile(
          input: {
          data: { user: "${id}", technologies: [${technologies}]} }) {
          profile {
            id
            user {
                id
                username
                email
              }
              technologies{
                id
                title
              }
          }
          
        }
      }`,
    });
    return data.createProfile.profile;
  };
}
