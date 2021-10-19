import { Strapi } from "@nuxtjs/strapi";
import { Positions } from "../../models/Positions";
import { Technology } from "~/models/Technology";

export interface PositionsServices {
  $positions(id: string): Promise<Partial<Positions>[]>;

  $createPosition(
    startup: string,
    technologies: Array<Technology>,
    specialisation: string
  ): Promise<Partial<Positions>>;

  $deletePositions(id: string): Promise<Partial<Positions>>;

  $updatePosition(
    id: string,
    technologies: Array<Technology>,
    specialisation: string
  ): Promise<Partial<Positions>>;

  $updateStatusPosition(
    id: string,
    status: string
  ): Promise<Partial<Positions>>;
}

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
        specialisation: "${specialisation}", technologies: [${technologies}], status: open  } }) {
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

export function updateStatusPosition($strapi: Strapi) {
  return async (id: string, status: string) => {
    const data = await $strapi.graphql({
      query: `mutation {
        updatePosition(
            input: {
             where: {id: "${id}"}
             data: { status: ${status}  }
             }
             ) {
          position {
            id
          }
        }
      }`,
    });
    return data.updatePosition.position ? data.updatePosition.position : null;
  };
}
