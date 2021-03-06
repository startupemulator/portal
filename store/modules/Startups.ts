import {
  Module,
  VuexAction,
  VuexModule,
  VuexMutation,
} from "nuxt-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Context } from "@nuxt/types";
import { store } from "~/store";
import { Startup } from "~/models/Startup";

interface StartupsState {
  cards: Array<Startup>;
}

@Module({ dynamic: true, store, name: "Startups", namespaced: true })
class Startups extends VuexModule implements StartupsState {
  public cards: Array<Startup> = [];

  @VuexMutation
  public apply(cards: Array<Startup>) {
    this.cards = cards;
  }

  @VuexAction({ commit: "apply", rawError: true })
  public async fetch(context: Context) {
    return await context.$strapi.find("startups");
  }
}

export default getModule(Startups);
