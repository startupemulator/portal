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
export function userChallengesByUserId($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        userChallenges(where: {user: {id: "${id}"}}) {
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
    return data.userChallenges ? data.userChallenges[0] : null;
  };
}
export function deleteUserChallenges($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        deleteUserChallenge(input: {where: {id: "${id}"}}) {
          userChallenge{
            id
          }
           
  }
}`,
    });
    return data.deleteUserChallenges
      ? data.deleteUserChallenges.userChallenge
      : null;
  };
}
