import { Strapi } from "@nuxtjs/strapi";
import { Feedbacks } from "../../models/Feedbacks";

export interface FeedbacksServices {
  $feedbacksByStartupID(id: string): Promise<Partial<Feedbacks>[]>;

  $newFeedbacksByStartupID(id: string): Promise<Partial<Feedbacks>[]>;

  $feedbacks(): Promise<Partial<Feedbacks>[]>;
  $expertFeedbacks(expertId: string): Promise<Partial<Feedbacks>[]>;

  $feedbackById(id: string): Promise<Partial<Feedbacks>[]>;

  $updateFeedback(id: string, badges: []): Promise<Partial<Feedbacks>[]>;

  $publicFeedback(id: string): Promise<Partial<Feedbacks>[]>;

  $unPublicFeedback(id: string): Promise<Partial<Feedbacks>[]>;

  $createFeedback(
    expert: string,
    description: string,
    criterions: Array<string>,
    badges: Array<string>,
    request: string
  ): Promise<Partial<Feedbacks>>;
}

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
      profile{
        name
        slug
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
        profile{
          name
          slug
        }
      }
    }
  }
}`,
    });
    return data.feedbacks ? data.feedbacks : null;
  };
}
export function newFeedbacksByStartupID($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
        feedbacks(where:{
          _where: [{request: {startup: {id: "${id}"}}}, {is_public: false}]
        } ) {
    id
    is_public
    request {
      id
      startup {
        id
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
      profile{
        name
        slug
      }
    }
    request {
      id
      is_new
      startup {
        id
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
    }
  }
}`,
    });
    return data.feedbacks ? data.feedbacks : null;
  };
}
export function expertFeedbacks($strapi: Strapi) {
  return async (expertId: string) => {
    const data = await $strapi.graphql({
      query: `query {
        feedbacks(where: {expert:{id: "${expertId}"}}, sort: "published_at:desc") {
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
      profile{
        name
        slug
      }
    }
    request {
      id
      is_new
      startup {
        id
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
      profile{
        name
        slug
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
        profile{
          name
          slug
        }

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
export function unPublicFeedback($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateFeedback(
          input:{
          where: {id: "${id}"}
            data: { is_public: false } }) {
          feedback {
          id
    }
  }
}`,
    });
    return data.updateFeedback ? data.updateFeedback.feedback : null;
  };
}
