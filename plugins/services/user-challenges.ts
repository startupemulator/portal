import { Strapi } from "@nuxtjs/strapi";
import { userChallenges } from "../../models/UserChallenges";

export interface UserChallengesServices {
  $userChallengesById(id: string): Promise<Partial<userChallenges>[]>;

  $userChallengesByUserId(id: string): Promise<Partial<userChallenges>[]>;

  $deleteUserChallenges(id: string): Promise<Partial<userChallenges>>;
}

export function userChallengesById($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        userChallenges(where: {challenge: {id: "${id}"}}) {
           id
           user{
             id
             profile{
              name
              slug
            }
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
             profile{
              name
              slug
            }
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
