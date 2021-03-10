import { Module, VuexModule } from "nuxt-property-decorator";
import { getModule } from "vuex-module-decorators";
import { store } from "~/store";

interface LandingPageState {
  test: string;
}

@Module({ dynamic: true, store, name: "LandingPage", namespaced: true })
class LandingPage extends VuexModule implements LandingPageState {
  test: string;
}

export default getModule(LandingPage);
