import { Module, MutationAction, VuexModule } from "nuxt-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Store } from "vuex";
import { store } from "../index";

interface SpinnerState {
  visible: boolean;
}

@Module({ dynamic: true, store, name: "Spinner", namespaced: true })
class Spinner extends VuexModule implements SpinnerState {
  store: Store<SpinnerState>;

  visible = false;

  @MutationAction<SpinnerState>({ mutate: ["visible"] })
  hide() {
    return { visible: false };
  }

  @MutationAction<SpinnerState>({ mutate: ["visible"] })
  show() {
    return { visible: true };
  }
}

export default getModule(Spinner);
