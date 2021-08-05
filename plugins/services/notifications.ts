import { Strapi } from "@nuxtjs/strapi";

export function notifications($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
        notifications {
    id
    message
    link
    type
    startup{
      id
    }
    challenge {
      id
    }
    creator{
      id
    }
  }
}`,
    });
    return data;
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
