import { Strapi } from "@nuxtjs/strapi";
import { Invites } from "../../models/Invites";

export interface InvitesServices {
  $createInvite(
    email: string,
    position: string,
    startup: string,
    inviter: string
  ): Promise<Partial<Invites>>;

  $deleteInvite(id: string): Promise<Partial<Invites>>;
}

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
              is_expert
              position{
                  id
                  startup{
                    id
                  }
                  specialisation{
                    id
                    title
                  }
              }
            }
          }
        }`,
    });
    return data.createInvite ? data.createInvite.invite : null;
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
