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
export function deletePositions($strapi: Strapi) {
  return async (id: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        deletePosition (input: {where: {id: ${id}}}) {
            position{
                id
            }
    }
  }`,
    });
    return data.deletePosition.position ? data.deletePosition.position : null;
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
                title
            }
            
          }
        }
      }`,
    });
    return data.createPosition.position ? data.createPosition.position : null;
  };
}
export function updatePosition($strapi: Strapi) {
  return async (
    id: string,
    technologies: Array<Technology>,
    specialisation: string
  ) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updatePosition(
            input: {
             where: {id: "${id}"}
             data: { specialisation: "${specialisation}", technologies: [${technologies}]  }
             }
             ) {
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
                title
            }
            
          }
        }
      }`,
    });
    return data.updatePosition.position ? data.updatePosition.position : null;
  };
}
