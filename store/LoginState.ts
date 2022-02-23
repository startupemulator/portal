import {
  Module,
  MutationAction,
  VuexMutation,
  VuexModule,
} from "nuxt-property-decorator";
export interface LoginStateInterface {
  isLogined: boolean;
}
@Module({ name: "LoginState", namespaced: true })
export default class LoginState extends VuexModule implements LoginState {
  isLogined = false;

  @MutationAction
  init(context: NuxtContext) {
    const { $strapi } = context;

    const isLogined = !!$strapi.user;
    return {
      isLogined,
    };
  }
}
