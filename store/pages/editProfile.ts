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
  experiences: Experience[] = [];
  userName = "this.userData.profile.name";

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

      return { technologies, experiences, profile };
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
  changeTotalexperience(experience) {
    const { profile } = this.state as EditProfileState;
    profile.experience = experience;
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
  async saveProfile(context: NuxtContext) {
    // const { profile, technologies } = this.state as EditProfileState;
    const { profile } = this.state as EditProfileState;

    // const experience = profile.experience;
    // console.log(experience);

    // const updateTechnologies = [];
    // technologies.forEach((el) => {
    //   if (el.checked) {
    //     updateTechnologies.push(el.id);
    //   }
    // });
    const { $strapi, $profile } = context;
    try {
      //   const updateProfileData = await $updateProfile(
      //     profile.user.id,
      //     updateTechnologies,
      //     experience
      //   );
      const profile = await $profile($strapi.user.id);
      //   newProfileName = await $updateProfileName("profile.name");
      console.log(profile);
    } catch (e) {
      console.error(e);
    }
    return {
      profile,
    };
  }
}
