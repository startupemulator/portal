import Vuex, { Store } from "vuex";
import Vue from "vue";
import { getModule } from "vuex-module-decorators";
import Landing, { LandingPageState } from "./pages/LandingPage";
import { SpinnerState } from "./modules/Spinner";
import { ToastState } from "./modules/Toast";

interface RootState {
  Landing: LandingPageState;
  Spinner: SpinnerState;
  Toast: ToastState;
}

Vue.use(Vuex);

export const store = new Store<RootState>({
  modules: {
    Landing,
  },
  actions: {
    nuxtServerInit: () => {},
  },
});
const createStore = (): Store<RootState> => {
  return store;
};
export default createStore;
export const LandingPage = getModule(Landing, store);
