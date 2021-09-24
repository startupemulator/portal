import { Strapi } from "@nuxtjs/strapi";

export function profile($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
  profiles(where:{user:{id: "${id}"}}) {
      id
      slug
      is_expert
      gardenkeeper
    user {
        id
        email
        provider
        profile{
          name
          slug
        }
      }
      technologies{
        id
        title
        is_public
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
export function profileByUserId($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
  profiles(where:{user:{id: "${id}"}}) {
      id
      name
      slug
    user {
        id
        
    }
  }
}`,
    });
    return data ? data.profiles : null;
  };
}
export function expertProfiles($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
  profiles(where: {is_expert: true}) {
    user {
        id
      }
  }
}`,
    });
    return data.profiles ? data.profiles : null;
  };
}
export function profileBySlug($strapi: Strapi) {
  return async (slug: string) => {
    const data = await $strapi.graphql({
      query: `query {
  profiles(where:{slug: "${slug}"}) {
      id
      slug
      is_expert
    user {
        id
        email
        provider
        profile{
          name
          slug
        }
      }
      technologies{
        id
        title
        is_public
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
            is_expert
            slug
            user {
                id
                email
                profile{
                  name
                  slug
                }
              }
              technologies{
                id
                title
                is_public
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
export function updateProfileName($strapi: Strapi) {
  return async (id: string, name: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateProfile(
          input: {
          where:{id: "${id}"}
          data: { name: "${name}"} }) {
          profile {
            id
            name
            slug
            user{
              id
            }
          }
        }
      }`,
    });
    return data.updateProfile.profile;
  };
}
