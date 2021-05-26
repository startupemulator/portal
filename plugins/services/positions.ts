import { Strapi } from "@nuxtjs/strapi";
import { Technology } from "~/models/Technology";

export function positions($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `query {
    positions (where: {id: ${id}}) {
    id
  }
}`,
    });
    return data.positions ? data.positions[0] : null;
  };
}
export function createPosition($strapi: Strapi) {
  return async (
    startup: string,
    technologies: Array<Technology>,
    specialisation: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        createPosition(input: { data: { startup: "${startup}",
        specialisation: "${specialisation}", technologies: [${technologies}]  } }) {
          position {
            id
            specialisation{
                id
            }
            startup{
                id
            }
            technologies{
                id
            }
            
          }
        }
      }`,
    });
    return data.createPosition ? data.createPosition : null;
  };
}
