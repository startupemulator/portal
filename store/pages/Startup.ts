import {
  Module,
  MutationAction,
  VuexMutation,
  VuexModule,
} from "nuxt-property-decorator";
import { NuxtContext } from "../../types/services";
import { Startup } from "../../models/Startup";
import { Feedbacks } from "../../models/Feedbacks";
import { Applications } from "../../models/Applications";
import { Estimation } from "../../models/Estimation";
import { Specialisation } from "../../models/Specialisation";
import { Technology } from "../../models/Technology";
import { AskFeedbacks } from "../../models/AskFeedbacks";
import { Directions } from "../../models/Directions";
import { Badges } from "../../models/Badges";
import { Releases } from "../../models/Releases";
import { Profile } from "../../models/Profile";
import { Invites } from "../../models/Invites";
import { Experience } from "../../models/Experience";

export interface StartupPageState {
  startup: Startup[];
  feedbacks: Feedbacks[];
  applications: Applications[];
  newApplication: Applications[];
  estimations: Estimation[];
  specialisations: Specialisation[];
  technologies: Technology[];
  askFeedbacks: AskFeedbacks[];
  directions: Directions[];
  badges: Badges[];
  releases: Releases[];
  profile: Profile[];
  invites: Invites[];
  specialisationsForInvites: Specialisation[];
  experience: Experience[];
}
@Module({ name: "StartupPage", namespaced: true })
export default class StartupPage
  extends VuexModule
  implements StartupPageState
{
  startup: Startup[] = [];
  feedbacks: Feedbacks[] = [];
  applications: Applications[] = [];
  newApplication: Applications[] = [];
  estimations: Estimation[] = [];
  specialisations: Specialisation[] = [];
  technologies: Technology[] = [];
  askFeedbacks: AskFeedbacks[] = [];
  directions: Directions[] = [];
  badges: Badges[] = [];
  releases: Releases[] = [];
  profile: Profile[] = [];
  isOwner: boolean = false;
  isDeveloper: boolean = false;
  isExpert: boolean = false;
  developerPosition: string = "";
  invites: Invites[] = [];
  specialisationsForInvites: Specialisation[] = [];
  experiences: Experience[] = [];

  @MutationAction
  async init(context: NuxtContext) {
    const { $strapi, route } = context;
    let profile = [];
    let releases = [];
    let directions = [];
    let badges = [];
    let developerPosition = "";
    let isOwner = false;
    let isDeveloper = false;
    let isExpert = false;
    let applicationId;
    const invites = [];
    const specialisationsForInvites = [];

    try {
      const startup = await context.$startup(route.params.slug);
      const feedbacks = await context.$feedbacksByStartupID(startup.id);
      const askFeedbacks = await context.$askFeedbacksByStartupId(startup.id);
      const { applications } = await context.$applicationsByStartupId(
        startup.id
      );
      const { estimations } = await context.$estimations();
      const { specialisations } = await context.$specialisations();
      const { technologies } = await context.$technologies();
      const { experiences } = await context.$experiences();
      if ($strapi.user) {
        profile = await context.$profile($strapi.user.id);
      }
      if (startup.state === "finished") {
        releases = await context.$releases(startup.id);
      }
      if ($strapi.user) {
        directions = await context.$directions();
        badges = await context.$badges();
        if (badges !== null) {
          badges.forEach((badge) => (badge.isActive = false));
        }
        if ($strapi.user && +$strapi.user.id === +startup.owner.id) {
          isOwner = true;
        }
        if ($strapi.user) {
          applications.forEach((item) => {
            item.position.applications.forEach((el) => {
              if (
                el.status === "accepted" &&
                +$strapi.user.id === +el.user.id
              ) {
                applicationId = el.id;
                isDeveloper = true;
                developerPosition = item.position.specialisation.title;
              } else if (
                el.status === "advanced" &&
                +$strapi.user.id === +el.user.id
              ) {
                isOwner = true;
              }
            });
          });
        }
        if ($strapi.user && $strapi.user.email && startup.owner.invites) {
          isExpert = profile.is_expert;
          startup.owner.invites.forEach((el) => {
            if (el.email === $strapi.user.email) {
              isExpert = true;
            }
          });
        }
        if (startup.positions) {
          startup.positions.forEach((el) => {
            specialisationsForInvites.push(el.specialisation);
          });
        }
        if (startup.owner.invites) {
          startup.owner.invites.forEach((el) => {
            if (
              el.position &&
              el.position.startup !== null &&
              startup.id === el.position.startup.id
            ) {
              invites.push(el);
            }
          });
        }
      }
      return {
        startup,
        feedbacks,
        askFeedbacks,
        applications,
        estimations,
        specialisations,
        technologies,
        profile,
        releases,
        directions,
        badges,
        isOwner,
        isExpert,
        invites,
        specialisationsForInvites,
        experiences,
      };
    } catch (e) {
      console.error(e);
    }
  }

  @MutationAction
  async createPosition(context: NuxtContext) {
    const { startup } = this.state as StartupPageState;
    const { $createPosition } = context;
    try {
      const newPosition = await $createPosition(startup.id);
      if (newPosition !== null) {
        startup.positions.push(newPosition);
      }
    } catch (e) {
      console.error(e);
    }
    return {
      startup,
    };
  }

  @MutationAction
  async removePosition({ context, id }) {
    const { startup } = this.state as StartupPageState;
    let { specialisationsForInvites } = this.state as StartupPageState;

    const { $deletePositions } = context;
    try {
      const removePosition = await $deletePositions(id);
      if (removePosition !== null) {
        startup.positions = startup.positions.filter(
          (el) => el.id !== removePosition.id
        );
      }
      specialisationsForInvites = [];
      if (startup.positions) {
        startup.positions.forEach((el) => {
          specialisationsForInvites.push(el.specialisation);
        });
      }
    } catch (e) {
      console.error(e);
    }
    return {
      startup,
      specialisationsForInvites,
    };
  }

  @MutationAction
  async addSpecialityToPosition({ context, titleId, id }) {
    const { startup } = this.state as StartupPageState;
    let { specialisationsForInvites } = this.state as StartupPageState;
    const { $updatePosition } = context;
    try {
      const updatePosition = await $updatePosition(id, ["0"], titleId);
      if (updatePosition !== null) {
        startup.positions.forEach((position) => {
          if (position.id === updatePosition.id) {
            position.specialisation = {
              title: updatePosition.specialisation.title,
              id: updatePosition.specialisation.id,
            };
            specialisationsForInvites = [];
            if (startup.positions) {
              startup.positions.forEach((el) => {
                specialisationsForInvites.push(el.specialisation);
              });
            }
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
    return {
      startup,
      specialisationsForInvites,
    };
  }

  @VuexMutation
  addTechnologyToPosition({ positionId, technology }) {
    this.startup.positions.forEach((position) => {
      if (position.id === positionId && !technology.checked) {
        technology.checked = true;
        position.technologies.push(technology);
      }
    });
  }

  @VuexMutation
  removeTechnologyToPosition({ positionId, technology }) {
    this.startup.positions.forEach((position) => {
      if (position.id === positionId && technology.checked) {
        technology.checked = false;
        position.technologies = position.technologies.filter(
          (el) => el.id !== technology.id
        );
      }
    });
  }

  @VuexMutation
  removePersonalTechnology({ technologies, positionId }) {
    this.startup.positions.forEach((position) => {
      if (position.id === positionId) {
        if (technologies[0] !== false) {
          position.technologies = position.technologies
            .filter((el) => el.is_public)
            .concat(technologies);
        } else {
          position.technologies = position.technologies.filter(
            (el) => el.is_public
          );
        }
      }
    });
  }

  @MutationAction
  async createCustomTechnology({ context, technology, positionId }) {
    const { startup } = this.state as StartupPageState;
    const { $createTechnologies } = context;
    let newTechnology = {};

    try {
      newTechnology = await $createTechnologies(startup.owner.id, technology);
    } catch (e) {
      console.error(e);
    }
    if (newTechnology !== null) {
      startup.positions.forEach((position) => {
        if (position.id === positionId) {
          position.technologies.push(newTechnology);
        }
      });
    }
    return {
      startup,
    };
  }

  @MutationAction
  async updatePosition({ context, positionId, technologies, specialisation }) {
    const { startup } = this.state as StartupPageState;
    const { $updatePosition } = context;
    try {
      await $updatePosition(positionId, technologies, specialisation);
    } catch (e) {
      console.error(e);
    }
    return { startup };
  }

  @VuexMutation
  skipTechnologies({ positionId, chosenTechnologies }) {
    this.startup.positions.forEach((position) => {
      if (position.id === positionId) {
        position.technologies = position.technologies.filter((el) =>
          chosenTechnologies.includes(el.id)
        );
      }
    });
  }

  @MutationAction
  async requestToTeam({ context, userId, position, comment }) {
    let { newApplication } = this.state as StartupPageState;
    const { $createApplication } = context;
    try {
      const application = await context.$createApplication(
        userId,
        position,
        comment
      );
      if (application !== null) {
        newApplication = application;
      }
    } catch (e) {
      console.error(e);
    }
    return { newApplication };
  }

  @MutationAction
  async deleteStartup({ context, id, startupName }) {
    const { startup } = this.state as StartupPageState;
    const { $deleteDraft } = context;
    try {
      const deletedstartup = await context.$deleteDraft(id);
      if (deletedstartup !== null) {
        startup.state = deletedstartup.state;
      }
    } catch (e) {
      console.error(e);
    }
    return { startup };
  }

  @MutationAction
  async inviteCollegue({ context, data }) {
    const { startup, invites } = this.state as CreateProjectState;
    const { $createInvite } = context;
    try {
      const newInvite = await $createInvite(
        data.email,
        data.position_id,
        startup.id,
        startup.owner.id
      );
      if (newInvite !== null) {
        invites.push(newInvite);
      }
    } catch (e) {
      console.error(e);
    }

    return { startup };
  }

  @MutationAction
  async changePremission({
    context,
    permission,
    applicationId,
    positionCount,
    declineReason,
  }) {
    const { startup } = this.state as CreateProjectState;
    const {
      $applicationAccept,
      $applicationAdvancedAccess,
      $applicationDecline,
    } = context;
    let modificationApplication = [];
    try {
      if (permission === "Default access") {
        modificationApplication = await $applicationAccept(applicationId);
      } else if (permission === "Decline") {
        modificationApplication = await $applicationDecline(
          applicationId,
          declineReason
        );
      } else {
        modificationApplication = await $applicationAdvancedAccess(
          applicationId
        );
      }

      if (typeof declineReason === "boolean") {
        startup.positions[positionCount].applications.forEach((application) => {
          if (application.id === applicationId) {
            application.status = modificationApplication.status;
          }
        });
      }
      console.log("finished");
    } catch (e) {
      console.error(e);
    }
    return { startup };
  }

  @MutationAction
  async changePositionStatus({ context, positionId, status }) {
    const { startup } = this.state as CreateProjectState;
    const { $updateStatusPosition } = context;
    let updatePosition;
    try {
      updatePosition = await $updateStatusPosition(positionId, status);
    } catch (e) {
      console.error(e);
    }
    startup.positions.forEach((position) => {
      if (position.id === positionId) {
        position.status = updatePosition.status;
      }
    });

    return { startup };
  }
}
