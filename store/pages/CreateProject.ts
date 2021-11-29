import {
  Module,
  VuexMutation,
  MutationAction,
  VuexModule,
} from "nuxt-property-decorator";
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
    let { draftStartup } = this.state as CreateProjectState;
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
        draftStartup = newStartup;
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

  @MutationAction
  async createPosition(context: NuxtContext) {
    const { draftStartup } = this.state as CreateProjectState;
    const { $createPosition } = context;
    try {
      const newPosition = await $createPosition(draftStartup.id, ["0"], "12");
      if (newPosition !== null) {
        draftStartup.positions.push(newPosition);
      }
    } catch (e) {
      console.error(e);
    }
    return {
      draftStartup,
    };
  }

  @MutationAction
  async removePosition({ context, id }) {
    const { draftStartup } = this.state as CreateProjectState;
    const { $deletePositions } = context;
    try {
      const removePosition = await $deletePositions(id);
      if (removePosition !== null) {
        draftStartup.positions = draftStartup.positions.filter(
          (el) => el.id !== removePosition.id
        );
      }
    } catch (e) {
      console.error(e);
    }
    return {
      draftStartup,
    };
  }

  @MutationAction
  async addSpecialityToPosition({ context, titleId, id }) {
    const { draftStartup } = this.state as CreateProjectState;
    const { $updatePosition } = context;
    try {
      const updatePosition = await $updatePosition(id, ["0"], titleId);
      if (updatePosition !== null) {
        draftStartup.positions.forEach((position) => {
          if (position.id === updatePosition.id) {
            position.specialisation.title = updatePosition.specialisation.title;
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
    return {
      draftStartup,
    };
  }

  @VuexMutation
  addTechnologyToPosition({ positionId, technology }) {
    this.draftStartup.positions.forEach((position) => {
      if (position.id === positionId && !technology.checked) {
        technology.checked = true;
        position.technologies.push(technology);
      }
    });
  }

  @VuexMutation
  removeTechnologyToPosition({ positionId, technology }) {
    this.draftStartup.positions.forEach((position) => {
      if (position.id === positionId && technology.checked) {
        technology.checked = false;
        position.technologies = position.technologies.filter(
          (el) => el.id !== technology.id
        );
      }
    });
  }

  @VuexMutation
  skipTechnologies({ positionId, chosenTechnologies }) {
    this.draftStartup.positions.forEach((position) => {
      if (position.id === positionId) {
        position.technologies = [];
        this.technologies.forEach((item) => {
          if (chosenTechnologies.some((el) => +el === +item.id)) {
            position.technologies.push(item);
          }
        });
      }
    });
  }

  @MutationAction
  async createCustomTechnology({ context, technology, positionId }) {
    const { draftStartup } = this.state as CreateProjectState;
    const { $createTechnologies } = context;
    let newTechnology = {};
    try {
      newTechnology = await $createTechnologies(draftStartup.owner, technology);
    } catch (e) {
      console.error(e);
    }
    if (newTechnology !== null) {
      draftStartup.positions.forEach((position) => {
        if (position.id === positionId) {
          position.technologies.push(newTechnology);
        }
      });
    }
    return {
      draftStartup,
    };
  }

  @VuexMutation
  removePersonalTechnology({ technologies, positionId }) {
    this.draftStartup.positions.forEach((position) => {
      if (position.id === positionId) {
        position.technologies = position.technologies
          .filter((el) => el.is_public)
          .concat(technologies);
      }
    });
  }
}
