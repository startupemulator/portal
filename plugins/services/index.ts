import { Context, Plugin } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import {
  startup,
  startups,
  myStartups,
  deleteDraft,
} from "~/plugins/services/startups";
import { Startup } from "~/models/Startup";
import { challenge, challenges } from "~/plugins/services/challenges";
import { Challenge } from "~/models/Challenge";
import { estimations } from "~/plugins/services/estimations";
import { experiences } from "~/plugins/services/experiences";
import { Estimation } from "~/models/Estimation";
import { Experience } from "~/models/Experience";
import { Testimonial } from "~/models/Testimonial";
import { testimonials } from "~/plugins/services/testimonials";
import { myTechnologies, technologies } from "~/plugins/services/technologies";
import { Technology } from "~/models/Technology";
import { Profile } from "~/models/Profile";
import { profile, updateProfile } from "~/plugins/services/profile";

export interface Services {
  $estimations(): Promise<Partial<Estimation>[]>;
  $experiences(): Promise<Partial<Experience>[]>;
  $profile(): Promise<Partial<Profile>[]>;
  $updateProfile(
    id: string,
    technologies: Array<string>,
    experience: string
  ): Promise<Partial<Profile>[]>;

  // experience: string
  $challenges(
    difficulty: number[],
    specialisations: number[]
  ): Promise<Partial<Challenge>[]>;

  $challenge(slug: string): Promise<Partial<Challenge>>;

  $startups(states: string[]): Promise<Partial<Startup>[]>;
  $myStartups(states: string[]): Promise<Partial<Startup>[]>;
  $deleteDraft(states: string[]): Promise<Partial<Startup>>;

  $startup(slug: string[]): Promise<Partial<Startup>>;
  $testimonials(): Promise<Partial<Testimonial>[]>;

  $technologies(isPublic: boolean): Promise<Partial<Technology>[]>;
  $myTechnologies(creator: string): Promise<Partial<Technology>[]>;
}

const strapiServices: Plugin = (ctx: Context, inject: Inject): void => {
  inject("estimations", estimations(ctx.$strapi));
  inject("experiences", experiences(ctx.$strapi));

  inject("challenges", challenges(ctx.$strapi));
  inject("challenge", challenge(ctx.$strapi));

  inject("startups", startups(ctx.$strapi));
  inject("myStartups", myStartups(ctx.$strapi));
  inject("deleteDraft", deleteDraft(ctx.$strapi));
  inject("startup", startup(ctx.$strapi));

  inject("profile", profile(ctx.$strapi));
  inject("updateProfile", updateProfile(ctx.$strapi));

  inject("testimonials", testimonials(ctx.$strapi));

  inject("technologies", technologies(ctx.$strapi));
  inject("myTechnologies", myTechnologies(ctx.$strapi));
};

export default strapiServices;
