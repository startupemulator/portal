import { Context, Plugin } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { startups } from "./startups";
import { Startup } from "~/models/Startup";
import { challenges } from "~/plugins/services/challenges";
import { Challenge } from "~/models/Challenge";

export interface Services {
  $startups(): Promise<Partial<Startup>[]>;
  $challenges(): Promise<Partial<Challenge>[]>;
}

const strapiServices: Plugin = (ctx: Context, inject: Inject): void => {
  inject("startups", startups(ctx.$strapi));
  inject("challenges", challenges(ctx.$strapi));
};

export default strapiServices;
