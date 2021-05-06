import { Context, Plugin } from "@nuxt/types";
import { Inject } from "@nuxt/types/app";
import { startups } from "./startups";
import { Startup } from "~/models/Startup";

export interface Services {
  $startups(): Promise<Partial<Startup>[]>;
}

const strapiServices: Plugin = (ctx: Context, inject: Inject): void => {
  inject("startups", startups(ctx.$strapi));
};

export default strapiServices;
