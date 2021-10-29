import { Module, MutationAction, VuexModule } from "nuxt-property-decorator";
import { NuxtContext } from "../../types/services";
import { Technology } from "../../models/Technology";
import { Experience } from "../../models/Experience";
import { Profile } from "../../models/Profile";
export interface EditProfileState {
  technologies: Technology[];
  experiences: Experience[];
  profile: Profile[];
}
@Module({ name: "EditProfile", namespaced: true })
export default class EditProfile
  extends VuexModule
  implements EditProfileState
{
  profile: Profile[] = [];
  technologies: Technology[] = [];
  personalAddedTechnologies: Technology[] = [];
  experiences: Experience[] = [];
  userName = "this.userData.profile.name";
  profileUpdated = false;
  // mutations

  @MutationAction
  async init(context: NuxtContext) {
    const { $strapi } = context;
    try {
      const { technologies } = await context.$technologies();
      const { experiences } = await context.$experiences();
      const profile = await context.$profile($strapi.user.id);
      technologies.forEach((technology) => {
        if (profile.technologies.some((el) => el.id === technology.id)) {
          technology.checked = true;
        } else {
          technology.checked = false;
        }
      });
      const personalAddedTechnologies = [];
      profile.technologies.forEach((technology) => {
        if (!technology.is_public) {
          personalAddedTechnologies.push(technology);
        }
      });

      return { technologies, experiences, profile, personalAddedTechnologies };
    } catch (e) {
      console.error(e);
    }
  }

  @MutationAction
  pickTechnology(technology) {
    const { technologies } = this.state as EditProfileState;
    technologies.forEach((el) => {
      if (technology.item.checked && el.id === technology.id) {
        el.checked = true;
      } else if (!technology.item.checked && el.id === technology.id) {
        el.checked = false;
      }
    });
    return {
      technologies,
    };
  }

  @MutationAction
  changeTotalExperience(experience) {
    const { profile } = this.state as EditProfileState;
    profile.experience.id = experience.id;
    return {
      profile,
    };
  }

  @MutationAction
  changeFullName(fullName) {
    const { profile } = this.state as EditProfileState;
    profile.name = fullName;
    return {
      profile,
    };
  }

  @MutationAction
  addPersonalAddedTechnologies(technology) {
    const { personalAddedTechnologies } = this.state as EditProfileState;
    personalAddedTechnologies.push({
      id: `new-${personalAddedTechnologies.length + 1}`,
      title: technology,
    });
    return {
      personalAddedTechnologies,
    };
  }

  @MutationAction
  removePersonalAddedTechnologies(technologies) {
    const personalAddedTechnologies = technologies;
    return {
      personalAddedTechnologies,
    };
  }

  @MutationAction
  async saveProfile(context: NuxtContext) {
    const { profile, technologies, personalAddedTechnologies } = this
      .state as EditProfileState;
    const { $updateProfile, $updateProfileName, $createTechnologies } = context;
    let profileUpdated = false;
    const experience = profile.experience.id;
    console.log(experience);
    const updateTechnologies = [];

    technologies.forEach((technology) => {
      if (technology.checked) {
        updateTechnologies.push(technology.id);
      }
    });
    // await console.log(updateTechnologies);

    try {
      if (personalAddedTechnologies.length !== 0) {
        for (const personalTechnology of personalAddedTechnologies) {
          if (personalTechnology.id.split("-")[0] === "new") {
            const createTechnology = await $createTechnologies(
              profile.user.id,
              personalTechnology.title
            );
            updateTechnologies.push(createTechnology.id);
          } else {
            updateTechnologies.push(personalTechnology.id);
          }
        }
      }
      await console.log(updateTechnologies);

      const updateProfileData = await $updateProfile(
        profile.id,
        updateTechnologies,
        experience
      );
      const updateProfileName = await $updateProfileName(
        profile.id,
        profile.name
      );

      if ((updateProfileData && updateProfileName) !== null) {
        profileUpdated = true;
        console.log(updateProfileData);
      }
    } catch (e) {
      console.error(e);
    }
    return {
      profileUpdated,
    };
  }
}