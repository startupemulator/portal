import {
  Module,
  VuexAction,
  VuexModule,
  VuexMutation,
  getModule,
} from "nuxt-property-decorator";
import { Context } from "@nuxt/types";
import { store } from "~/store";
import { Technology } from "~/models/Technology";

interface TechnologiesState {
  items: Array<Technology>;
}

@Module({ dynamic: true, store, name: "Technologies", namespaced: true })
class Technologies extends VuexModule implements TechnologiesState {
  public items: Array<Technology> = [];

  @VuexMutation
  public apply(items: Array<Technology>) {
    this.items = items.map((technology) => {
      return {
        id: technology.id,
        title: technology.title,
      };
    });
  }

  @VuexAction({ commit: "apply", rawError: true })
  public async fetch(context: Context) {
    return await context.$strapi.find("technologies");
  }
}

export default getModule(Technologies);
