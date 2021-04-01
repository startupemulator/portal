import {
  getModule,
  Module,
  VuexAction,
  VuexModule,
  VuexMutation,
} from "nuxt-property-decorator";
import { Store } from "vuex";
import { getSpecialisations } from "../api";
import { Specialisation } from "../../models/Specialisation";
import { store } from "~/store";

interface SpecialisationsState {
  items: Array<Specialisation>;
}

@Module({
  dynamic: true,
  store,
  name: "Specialisations",
  namespaced: true,
  stateFactory: true,
})
class Specialisations extends VuexModule implements SpecialisationsState {
  public items: Array<Specialisation> = [];
  public store: Store<Specialisation>;

  @VuexMutation
  public apply(items: Array<Specialisation> = []) {
    this.items = items;
  }

  @VuexAction({ commit: "apply", rawError: true })
  public async fetch() {
    return await getSpecialisations(this.store.app.$axios);
  }
}

export default getModule(Specialisations);
