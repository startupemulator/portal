import { Strapi } from "@nuxtjs/strapi";
import { Specialisation } from "../../models/Specialisation";

export interface SpecialisationsServices {
  $specialisations(): Promise<Partial<Specialisation>[]>;
}

export function specialisations($strapi: Strapi) {
  return () => {
    return $strapi.graphql({
      query: `query {
        specialisations {
    id
    title
  }
}`,
    });
  };
}
