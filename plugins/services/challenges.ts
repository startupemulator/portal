import { Strapi } from "@nuxtjs/strapi";

export function challenges($strapi: Strapi) {
  return (
    difficulty: number[] = [1, 2, 3, 4, 5],
    specialisations: number[] = []
  ) => {
    return $strapi.graphql({
      query: `query {
          challenges ( sort: "published_at:desc", where: {
    _where: [{difficulty_in: [${difficulty}]}, {specialisations_in: [${specialisations}]}]
  }) {
          id
          title
          sort
          description
          difficulty
          slug
          status
          specialisations {
            id
            title
          }
          users {
            id
            user {
              id
            }
            
          }
        }
      }`,
    });
  };
}

export function challenge($strapi: Strapi) {
  return async (slug: string) => {
    const data = await $strapi.graphql({
      query: `query {
  challenges (where: {slug: "${slug}"}) {
    id
    title
    description
    difficulty
    slug
    status
    specialisations {
      id
      title
    }
    author {
      id
      
    }
    sources {
      id
      link
      title
    }
  }
}`,
    });
    return data.challenges ? data.challenges[0] : null;
  };
}
export function createChallenge($strapi: Strapi) {
  return async (
    title: string,
    description: string,
    difficulty: string,
    specialisations: Array<string>,
    sources: Array<string>
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createChallenge(input: { data: { 
          title: "${title}", description: "${description}", difficulty: ${difficulty},
          specialisations: [${specialisations}], sources: [${sources}] } }) {
            challenge {
              id
              slug
            }
          }
        }`,
    });
    return data.createChallenge.challenge
      ? data.createChallenge.challenge
      : null;
  };
}
