import { Module, MutationAction, VuexModule } from "nuxt-property-decorator";
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

export interface StartupPageState {
  startup: Startup[];
  feedbacks: Feedbacks[];
  applications: Applications[];
  estimations: Estimation[];
  specialisations: Specialisation[];
  technologies: Technology[];
  askFeedbacks: AskFeedbacks[];
  directions: Directions[];
  badges: Badges[];
  releases: Releases[];
  profile: Profile[];
}
@Module({ name: "StartupPage", namespaced: true })
export default class StartupPage
  extends VuexModule
  implements StartupPageState
{
  startup: Startup[] = [];
  feedbacks: Feedbacks[] = [];
  applications: Applications[] = [];
  estimations: Estimation[] = [];
  specialisations: Specialisation[] = [];
  technologies: Technology[] = [];
  askFeedbacks: AskFeedbacks[] = [];
  directions: Directions[] = [];
  badges: Badges[] = [];
  releases: Releases[] = [];
  profile: Profile[] = [];
  title: string = "";
  isOwner: boolean = false;
  isDeveloper: boolean = false;
  isExpert: boolean = false;
  developerPosition: string = "";
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
      const title = startup.description;
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
      }
      return {
        startup,
        feedbacks,
        askFeedbacks,
        applications,
        estimations,
        specialisations,
        technologies,
        title,
        profile,
        releases,
        directions,
        badges,
        isOwner,
        isExpert,
      };
    } catch (e) {
      console.error(e);
    }
  }
}
