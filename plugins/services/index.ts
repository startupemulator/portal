import { Context, Plugin } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { startups } from "./startups";
import { Startup } from "~/models/Startup";
import { challenge, challenges } from "~/plugins/services/challenges";
import { Challenge } from "~/models/Challenge";
import { estimations } from "~/plugins/services/estimations";
import { Estimation } from "~/models/Estimation";
import { Testimonial } from "~/models/Testimonial";
import { testimonials } from "~/plugins/services/testimonials";
import { technologies } from "~/plugins/services/technologies";
import { Technology } from "~/models/Technology";

export interface Services {
  $estimations(): Promise<Partial<Estimation>[]>;

  $challenges(
    difficulty: number[],
    specialisations: number[]
  ): Promise<Partial<Challenge>[]>;

  $challenge(slug: string): Promise<Partial<Challenge>>;

  $startups(states: string[]): Promise<Partial<Startup>[]>;

  $testimonials(): Promise<Partial<Testimonial>[]>;

  $technologies(isPublic: boolean): Promise<Partial<Technology>[]>;
}

const strapiServices: Plugin = (ctx: Context, inject: Inject): void => {
  inject("estimations", estimations(ctx.$strapi));

  inject("challenges", challenges(ctx.$strapi));
  inject("challenge", challenge(ctx.$strapi));

  inject("startups", startups(ctx.$strapi));

  inject("testimonials", testimonials(ctx.$strapi));

  inject("technologies", technologies(ctx.$strapi));
};

export default strapiServices;
