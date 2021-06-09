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
    request {
      id
      is_new
      startup {
        id
      }
      creator{ 
        id
        name
        username
      }
    }
  }
}`,
    });
    return data.feedbacks ? data.feedbacks : null;
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
