import {
  Module,
  MutationAction,
  VuexMutation,
  VuexModule,
} from "nuxt-property-decorator";
import { Specialisation } from "../../models/Specialisation";
import { Sources } from "../../models/Sources";
import { Challenge } from "../../models/Challenge";
export interface CreateChallengeState {
  specialisations: Specialisation[];
}
@Module({ name: "CreateChallenge", namespaced: true })
export default class CreateChallenge
  extends VuexModule
  implements CreateChallengeState
{
  specialisations: Specialisation[] = [];
  sources: Sources[] = [];
  challenge: Challenge[] = [];
  @MutationAction
  async init(context: NuxtContext) {
    const { route } = context;
    let sources = [];
    let challenge = [];
    try {
      const { specialisations } = await context.$specialisations();
      if (route.params.slug !== undefined) {
        challenge = await context.$challenge(route.params.slug);
        sources = challenge.sources;
      } else {
        sources = [{ id: "0", title: "", link: "https://" }];
      }
      specialisations.forEach((specialisation) => {
        specialisation.checked = false;
      });
      return {
        specialisations,
        sources,
        challenge,
      };
    } catch (e) {
      console.error(e);
    }
  }

  @VuexMutation
  createSource() {
    this.sources.push({
      id: this.sources.length + 1,
      title: "",
      link: "https://",
      isNew: true,
    });
  }

  @VuexMutation
  removeSource(i) {
    this.sources.splice(i, 1);
  }

  @VuexMutation
  updateSource({ positionLink, title, link }) {
    this.sources[positionLink].title = title;
    this.sources[positionLink].link = link;
  }

  @VuexMutation
  pickSpecialisation(id) {
    this.specialisations.forEach((specialisation) => {
      if (id === specialisation.id && !specialisation.checked) {
        specialisation.checked = true;
      } else if (id === specialisation.id && specialisation.checked) {
        specialisation.checked = false;
      }
    });
  }

  @MutationAction
  async createChallenge({
    context,
    challengeName,
    challengeDescription,
    difficultyLevel,
    specialisation,
    status,
  }) {
    let { challenge } = this.state as CreateProjectState;
    const { sources } = this.state as CreateProjectState;
    const { $createChallenge, $createSourceForChallenge } = context;
    const createdSource = [];
    challengeName = challengeName.replace(/[^a-zA-Z ]/g, "");
    challengeDescription = challengeDescription.replace(/(\r\n|\n|\r)/gm, " ");
    try {
      for (const source of sources) {
        const newSource = await $createSourceForChallenge(
          source.title,
          source.link
        );
        if (newSource !== null) {
          createdSource.push(newSource.id);
        }
      }
      const newChallenge = await $createChallenge(
        status,
        challengeName,
        challengeDescription,
        difficultyLevel,
        specialisation,
        createdSource
      );
      if (newChallenge !== null) {
        challenge = newChallenge;
      }
    } catch (e) {
      console.error(e);
    }
    return { challenge };
  }

  @MutationAction
  async updateChallenge({
    context,
    challengeId,
    challengeName,
    challengeDescription,
    difficultyLevel,
    specialisation,
  }) {
    let { challenge } = this.state as CreateProjectState;
    const { sources } = this.state as CreateProjectState;
    const { $updateChallenge, $createSourceForChallenge } = context;
    const sourcesForChallenge = [];
    await console.log(challengeName);
    challengeName = challengeName.replace(/[^a-zA-Z ]/g, "");

    challengeDescription = challengeDescription.replace(/(\r\n|\n|\r)/gm, " ");
    console.log(challengeDescription);
    try {
      for (const source of sources) {
        if (source.isNew) {
          const newSource = await $createSourceForChallenge(
            source.title,
            source.link
          );
          if (newSource !== null) {
            sourcesForChallenge.push(newSource.id);
          }
        } else {
          sourcesForChallenge.push(source.id);
        }
      }
      const newChallenge = await $updateChallenge(
        challengeId,
        challengeName,
        challengeDescription,
        difficultyLevel,
        specialisation,
        sourcesForChallenge
      );
      if (newChallenge !== null) {
        challenge = newChallenge;
      }
    } catch (e) {
      console.error(e);
    }
    return { challenge };
  }
}
