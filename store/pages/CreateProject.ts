import { Module, MutationAction, VuexModule } from "nuxt-property-decorator";
import { NuxtContext } from "../../types/services";
import { Technology } from "../../models/Technology";
import { Estimation } from "../../models/Estimation";
import { Specialisation } from "../../models/Specialisation";
import { Startup } from "../../models/Startup";
export interface CreateProjectState {
  technologies: Technology[];
  estimations: Estimation[];
  specialisations: Specialisation[];
}
@Module({ name: "CreateProject", namespaced: true })
export default class CreateProject
  extends VuexModule
  implements CreateProjectState
{
  technologies: Technology[] = [];
  estimations: Estimation[] = [];
  specialisations: Specialisation[] = [];
  draftStartup: Startup[] = [];

  @MutationAction
  async init(context: NuxtContext) {
    const { route } = context;
    try {
      const { technologies } = await context.$technologies();
      const { estimations } = await context.$estimations();
      const { specialisations } = await context.$specialisations();
      let draftStartup = [];

      if (route.params.slug !== undefined) {
        const startup = await $startup(route.params.slug);
        draftStartup = startup;
      }
      return { technologies, estimations, specialisations, draftStartup };
    } catch (e) {
      console.error(e);
    }
  }
}
