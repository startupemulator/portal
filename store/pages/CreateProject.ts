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
        const startup = await context.$startup(route.params.slug);
        draftStartup = startup;
      }
      return { technologies, estimations, specialisations, draftStartup };
    } catch (e) {
      console.error(e);
    }
  }

  @MutationAction
  updateDraftStartup(data) {
    const { draftStartup } = this.state as CreateProjectState;
    draftStartup.title = data.title;
    draftStartup.description = data.description;
    draftStartup.start_date = data.start_date.toISOString();
    draftStartup.duration = data.duration;
    draftStartup.owner = data.owner;
    return { draftStartup };
  }

  @MutationAction
  async createNewStartup(context: NuxtContext) {
    const { draftStartup } = this.state as CreateProjectState;
    const { $createStartup } = context;
    try {
      const newStartup = await $createStartup(
        draftStartup.start_date,
        draftStartup.description,
        draftStartup.duration,
        draftStartup.title,
        draftStartup.owner
      );
      if (newStartup !== null) {
        draftStartup.id = newStartup.id;
      }
    } catch (e) {
      console.error(e);
    }

    return {
      draftStartup,
    };
  }

  @MutationAction
  async updateStartup(context: NuxtContext) {
    const { draftStartup } = this.state as CreateProjectState;
    const { $updateStartupInfo } = context;
    try {
      await $updateStartupInfo(
        draftStartup.id,
        draftStartup.start_date,
        draftStartup.description,
        draftStartup.duration,
        draftStartup.title
      );
    } catch (e) {
      console.error(e);
    }
    return {
      draftStartup,
    };
  }
}
