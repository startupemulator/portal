import { Strapi } from "@nuxtjs/strapi";

export function feedbacksByStartupID($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        feedbacks(where: {request: {startup: {id: "${id}"}}} sort: "published_at:desc") {
    id
    description
    is_public
    published_at
    criterions{
      id
      mark
      direction{
        id 
        title
      }
    }
    badges{
      id
      title
      image{
        url
      }
    }
    is_public
    likes{
      id
      user{
        id
      }
    }
    expert{
      id
      username
    }
    request {
      id
      is_new
      startup {
        id
      }
      creator{ 
        id
        
        username
      }
    }
  }
}`,
    });
    return data.feedbacks ? data.feedbacks : null;
  };
}
export function feedbacks($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
        feedbacks(sort: "published_at:desc") {
    id
    description
    is_public
    published_at
    criterions{
      id
      mark
      direction{
        id 
        title
      }
    }
    badges{
      id
      title
      image{
        url
      }
    }
    is_public
    likes{
      id
      user{
        id
      }
    }
    expert{
      id
      username
    }
    request {
      id
      is_new
      startup {
        id
      }
      creator{ 
        id
        
        username
      }
    }
  }
}`,
    });
    return data.feedbacks ? data.feedbacks : null;
  };
}
export function feedbackById($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        feedbacks(where: {id: "${id}"}, sort: "published_at:desc") {
          
    id
    description
    is_public
    published_at
    criterions{
      id
      mark
      direction{
        id 
        title
      }
    }
    badges{
      id
      title
      image{
        url
      }
    }
    is_public
    likes{
      id
      user{
        id
      }
    }
    expert{
      id
      username
    }
    request {
      id
      is_new
      startup {
        id
      }
      creator{ 
        id
        
        username
      
    }
  }
}
}`,
    });
    return data.feedbacks ? data.feedbacks[0] : null;
  };
}

export function createFeedback($strapi: Strapi) {
  return async (
    expert: string,
    description: string,
    criterions: Array<string>,
    badges: Array<string>,
    request: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createFeedback(input: { data: { expert: "${expert}", description: "${description}",
        criterions: [${criterions}], badges: [${badges}], request: "${request}", is_public: false} }) {
          feedback {
          id
    }
  }
}`,
    });
    return data.createFeedback ? data.createFeedback.feedback : null;
  };
}
export function updateFeedback($strapi: Strapi) {
  return async (id: string, badges: []) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateFeedback(
          input:{
          where: {id: "${id}"}
            data: { badges: [${badges}] } }) {
          feedback {
          id
    }
  }
}`,
    });
    return data.updateFeedback ? data.updateFeedback.feedback : null;
  };
}
export function publicFeedback($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateFeedback(
          input:{
          where: {id: "${id}"}
            data: { is_public: true } }) {
          feedback {
          id
    }
  }
}`,
    });
    return data.updateFeedback ? data.updateFeedback.feedback : null;
  };
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
            username
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
              username
              
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
            username
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
              username
              
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
