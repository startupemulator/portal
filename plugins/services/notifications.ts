import { Strapi } from "@nuxtjs/strapi";

export function createNotification($strapi: Strapi) {
  return async (
    creatorId: string,
    message: string,
    link: string,
    type: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createNotification(input: {
          data: {
            creator: "${creatorId}"
            message: "${message}"
            link: "${link}"
            type: "${type}"
          }
        }) {
          notification{
            id
          }
  }
}`,
    });
    return data.notification ? data.notification : null;
  };
}
export function createNotificationForStartup($strapi: Strapi) {
  return async (
    creatorId: string,
    message: string,
    link: string,
    type: string,
    startup: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createNotification(input: {
          data: {
            creator: "${creatorId}"
            message: "${message}"
            link: "${link}"
            type: ${type}
            startup: "${startup}"
          }
        }) {
          notification{
            id
          }   
  }
}`,
    });
    // return data;
    return data.createNotification
      ? data.createNotification.notification
      : null;
  };
}
export function createNotificationForChallenge($strapi: Strapi) {
  return async (
    creatorId: string,
    message: string,
    link: string,
    type: string,
    challenge: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createNotification(input: {
          data: {
            creator: "${creatorId}"
            message: "${message}"
            link: "${link}"
            type: "${type}"
            challenge: "${challenge}"
          }
        }) {
          notification{
            id
          }  
  }
}`,
    });
    return data.notification ? data.notification : null;
  };
}

export function createUserNotification($strapi: Strapi) {
  return async (userId: string, notificationId: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createUserNotification(input: {
          data: {
            user: "${userId}"
            notification: "${notificationId}"
          }
        }) {
          userNotification{
            id
          }
  }
}`,
    });
    return data.createUserNotification.userNotification
      ? data.createUserNotification.userNotification
      : null;
  };
}

export function userNotifications($strapi: Strapi) {
  return async (userId: string) => {
    const data = await $strapi.graphql({
      query: `query {
        userNotifications(where:{user:{id: "${userId}"}}) {
    id
    viewed
    notified_at
    viewed_at
    published_at 
    user{
      id

    }
    notification {
      id
      creator {
        id
        username
      }
      message
      link
      type
      startup{
        id
      }
      challenge{
        id
      }
    }  
  }
}`,
    });
    return data.userNotifications ? data.userNotifications : null;
  };
}
export function markReadNotification($strapi: Strapi) {
  return async (notificationId: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updateUserNotification(input:{
          where: {id: ${notificationId}}
          data: { viewed: true}
        }
          ) {
            userNotification{
              id
    }
  }
}`,
    });
    return data.userNotification ? data.userNotification : null;
  };
}
