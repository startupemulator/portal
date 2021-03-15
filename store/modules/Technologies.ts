import {
  getModule,
  Module,
  VuexAction,
  VuexModule,
  VuexMutation,
} from "nuxt-property-decorator";
import { getTechnologies } from "../api";
import { store } from "~/store";
import { Technology } from "~/models/Technology";

interface TechnologiesState {
  items: Array<Technology>;
}

@Module({
  dynamic: true,
  store,
  name: "Technologies",
  namespaced: true,
  stateFactory: true,
})
class Technologies extends VuexModule implements TechnologiesState {
  public items: Array<Technology> = [];

  @VuexMutation
  public apply(items: Array<Technology> = []) {
    this.items = items.map((technology) => {
      return {
        id: technology.id,
        title: technology.title,
      };
    });
  }

  @VuexAction({ commit: "apply", rawError: true })
  public async fetch() {
    return await getTechnologies();
  }
}

export default getModule(Technologies);
