import { Strapi } from "@nuxtjs/strapi";
import { Testimonial } from "../../models/Testimonial";

export interface TestimonialsServices {
  $testimonials(): Promise<Partial<Testimonial>[]>;
}

export function testimonials($strapi: Strapi) {
  return () => {
    return $strapi.graphql({
      query: `query {
  testimonials {
    id
    comment
    author
    title
    photo {
      url
    }
  }
}`,
    });
  };
}
