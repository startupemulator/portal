/* eslint-disable */
import { Services } from "~/plugins/services/services.interface";
import { Context } from "@nuxt/types";

declare module "vue/types/vue" {
  interface Vue extends Services {}
}

declare module "@nuxt/types" {
  interface NuxtAppOptions extends Services {}

  interface Context extends Services {}
}

declare module "vuex/types/index" {
  interface Store<S> extends Services {}
}


export interface NuxtContext extends Context, Services {}
