import { Module, VuexModule } from "nuxt-property-decorator";
import { getModule } from "vuex-module-decorators";
import { store } from "~/store";

interface LandingPageState {}

@Module({ dynamic: true, store, name: "LandingPage", namespaced: true })
class LandingPage extends VuexModule implements LandingPageState {}

export default getModule(LandingPage);
