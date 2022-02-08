import { Strapi } from "@nuxtjs/strapi";
import { Settings } from "~/models/Settings";

export interface SettingsServices {
  $settings(): Promise<Partial<Settings>[]>;
}

export function settings($strapi: Strapi) {
  return async () => {
    const data = await $strapi.graphql({
      query: `query {
  setting {
    landing_ads,
    landing_pricing,
    landing_startups,
    landing_challenges,
    landing_take_a_part,
    landing_testimonials,
    landing_top_startups
  }
}`,
    });
    return data.setting ? data.setting : null;
  };
}
