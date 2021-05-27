import { Strapi } from "@nuxtjs/strapi";

export function createInvite($strapi: Strapi) {
  return async (
    email: string,
    position: string,
    startup: string,
    inviter: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
          createInvite(input: { data: { email: "${email}",
          position: "${position}", startup: "${startup}", inviter: "${inviter}"  } }) {
            invite {
              id
              email
              position{
                  id
              }
            }
          }
        }`,
    });
    return data.createInvite ? data.createInvite : null;
  };
}
export function deleteInvite($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        deleteInvite(input: { where: { id: "${id}" } }) {
            invite {
              id
            }
          }
        }`,
    });
    return data.deleteInvite.invite ? data.deleteInvite.invite : null;
  };
}