import { Strapi } from "@nuxtjs/strapi";
import { AskFeedbacks } from "../../models/AskFeedbacks";

export interface AskFeedbacksServices {
  $askFeedbacksForStartup(): Promise<Partial<AskFeedbacks>[]>;

  $askFeedbacksForChallenges(): Promise<Partial<AskFeedbacks>[]>;

  $askFeedbacks(): Promise<Partial<AskFeedbacks>[]>;

  $askFeedbacksByChallengeId(id: string): Promise<Partial<AskFeedbacks>[]>;

  $askFeedbacksByStartupId(id: string): Promise<Partial<AskFeedbacks>[]>;

  $createAskFeedbackForStartup(
    creator: string,
    comment: string,
    technologies: [string],
    startup: string
  ): Promise<Partial<AskFeedbacks>[]>;

  $createAskFeedbackForChallenge(
    creator: string,
    comment: string,
    technologies: [string],
    challenge: string
  ): Promise<Partial<AskFeedbacks>[]>;
}

export function askFeedbacks($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
        requests {
    id
    comment
    is_new
    technologies{
      id
      title
    }
    challenge {
      id
    }
    startup {
      id
    }
  }
}`,
    });
    return data.requests ? data.requests : null;
  };
}
export function createAskFeedbackForStartup($strapi: Strapi) {
  return async (
    creator: string,
    comment: string,
    technologies: [],
    startup: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createRequest(input: { data: { comment: "${comment}",
         technologies: [${technologies}], startup: "${startup}", is_new: true, creator: "${creator}"} }) {
        request {
         id
         is_new
    comment
    technologies{
      id
      title
    }
    challenge {
      id
    }
    startup {
      id
    }
        }

  }
}`,
    });
    return data.createRequest ? data.createRequest.request : null;
  };
}
export function createAskFeedbackForChallenge($strapi: Strapi) {
  return async (
    creator: string,
    comment: string,
    technologies: [],
    challenge: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createRequest(input: { data: { comment: "${comment}",
        technologies: [${technologies}], challenge: "${challenge}", is_new: true, creator: "${creator}"} }) {
        request {
         id
         is_new
    comment
    technologies{
      id
      title
    }
    challenge {
      id
    }
    startup {
      id
    }
        }

  }
}`,
    });
    return data.createRequest ? data.createRequest.request : null;
  };
}
export function askFeedbacksByChallengeId($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        requests (where: {challenge: {id: "${id}"}}) {
          id
          comment
          is_new
          technologies{
            id
            title
          }
          challenge {
            id
          }
          creator{
            id
            profile{
              name
              slug
            }
          }
          feedbacks{
            id
            description
            criterions {
              id
              mark
              direction{
                id
                title
                comment
              }
            }
            badges {
              id
              title
              image {
                id
                url
              }
            }
            is_public
            expert{
              id
              profile{
                name
                slug
              }

            }
            published_at
          }
          solutions {
            id
            title
            url
            published_at
          }
        }
      }`,
    });
    return data.requests ? data.requests : null;
  };
}

export function askFeedbacksByStartupId($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        requests (where: {startup: {id: "${id}"}}) {
          id
          comment
          is_new
          technologies{
            id
            title
          }
          startup {
            id
          }
          creator{
            id
            profile{
              name
              slug
            }
          }
          feedbacks{
            id
            description
            criterions {
              id
              mark
              direction{
                id
                title
                comment
              }
            }
            badges {
              id
              title
              image {
                id
                url
              }
            }
            is_public
            expert{
              id
              profile{
                name
                slug
              }

            }
            published_at
          }
          solutions {
            id
            title
            url
            published_at
          }
        }
      }`,
    });
    return data.requests[0] ? data.requests : null;
  };
}
export function askFeedbacksForStartup($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
        requests (where: {startup_gt: "0"}){
    id
    startup {
      id
      state
    }
  }
}`,
    });
    return data.requests ? data.requests : null;
  };
}
export function askFeedbacksForChallenges($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
        requests (where: {challenge_gt: "0"}){
    id
    challenge {
      id
      title
    }
    creator{
      id
    }
    feedbacks{
      id
      description
      expert{
        id
      }
    }
  }
}`,
    });
    return data.requests ? data.requests : null;
  };
}
