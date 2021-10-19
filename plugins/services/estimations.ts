import { Strapi } from "@nuxtjs/strapi";
import { Estimation } from "~/models/Estimation";

export interface EstimationsServices {
  $estimations(): Promise<Partial<Estimation>[]>;
}

export function estimations($strapi: Strapi) {
  return () => {
    return $strapi.graphql({
      query: `query {
  estimations(sort: "id") {
    id
    title
    value
  }
}`,
    });
  };
}
