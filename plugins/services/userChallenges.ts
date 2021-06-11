import { Strapi } from "@nuxtjs/strapi";

export function userChallengesById($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        userChallenges(where: {challenge: {id: "${id}"}}) {
           id
           
           user{
             id
             username
           }
           estimation
           challenge{
             id
           }


  }
}`,
    });
    return data.userChallenges ? data.userChallenges : null;
  };
}
