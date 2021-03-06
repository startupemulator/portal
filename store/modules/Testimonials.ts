import {
  Module,
  VuexAction,
  VuexModule,
  VuexMutation,
} from "nuxt-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Context } from "@nuxt/types";
import { Testimonial } from "../../models/Testimonial";
import { store } from "~/store";

interface TestimonialsState {
  cards: Array<Testimonial>;
}

@Module({ dynamic: true, store, name: "Testimonials", namespaced: true })
class Testimonials extends VuexModule implements TestimonialsState {
  public cards: Array<Testimonial> = [];

  @VuexMutation
  public apply(cards: Array<Testimonial>) {
    this.cards = cards;
  }

  @VuexAction({ commit: "apply", rawError: true })
  public async fetch(context: Context) {
    return await context.$strapi.find("testimonials");
  }
}

export default getModule(Testimonials);
