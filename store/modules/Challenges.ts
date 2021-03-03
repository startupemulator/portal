import {
  Module,
  VuexAction,
  VuexModule,
  VuexMutation,
} from "nuxt-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Context } from "@nuxt/types";
import { Challenge } from "../../models/Challenge";
import { store } from "~/store";

interface ChallengesState {
  cards: Array<Challenge>;
}

@Module({ dynamic: true, store, name: "Challenges", namespaced: true })
class Challenges extends VuexModule implements ChallengesState {
  public cards: Array<Challenge> = [];

  @VuexMutation
  public setChallenges(challenges: Array<Challenge>) {
    this.cards = challenges;
  }

  @VuexAction({ commit: "setChallenges", rawError: true })
  public async fetch(context: Context) {
    return await context.$strapi.find("challenges");
  }
}

export default getModule(Challenges);
