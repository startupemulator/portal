import { Module, MutationAction, VuexModule } from "nuxt-property-decorator";
import { Challenge } from "../../models/Challenge";
import { Technology } from "../../models/Technology";
import { Testimonial } from "../../models/Testimonial";
import { NuxtContext } from "../../types/services";
import { Settings } from "../../models/Settings";
import { Startup } from "~/models/Startup";

export interface LandingPageState {
  startups: Startup[];
  challenges: Challenge[];
  technologies: Technology[];
  testimonials: Testimonial[];
  settings: Settings;
  confirmedEmail: boolean;
  passwordless: boolean;
}

@Module({ name: "Landing", namespaced: true })
export default class LandingPage
  extends VuexModule
  implements LandingPageState
{
  passwordless = false;
  confirmedEmail = false;
  startups: Startup[] = [];
  challenges: Challenge[] = [];
  technologies: Technology[] = [];
  testimonials: Testimonial[] = [];
  settings: Settings = {};

  @MutationAction
  async init(context: NuxtContext) {
    try {
      const settings = await context.$settings();
      const { startups } = await context.$startups();
      const { challenges } = await context.$challenges();
      const { testimonials } = await context.$testimonials();
      const { technologies } = await context.$technologies();
      return { startups, challenges, testimonials, technologies, settings };
    } catch (e) {
      console.log(e);
    }
  }

  @MutationAction
  moveRightStartups() {
    const { startups } = this.state as LandingPageState;
    return {
      startups: [
        startups[startups.length - 1],
        ...startups.slice(0, startups.length - 1),
      ],
    };
  }

  @MutationAction
  moveLeftStartups() {
    const { startups } = this.state as LandingPageState;
    return {
      startups: [...startups.slice(1), startups[0]],
    };
  }

  @MutationAction
  moveRightChallenges() {
    const { challenges } = this.state as LandingPageState;
    return {
      challenges: [
        challenges[challenges.length - 1],
        ...challenges.slice(0, challenges.length - 1),
      ],
    };
  }

  @MutationAction
  moveLeftChallenges() {
    const { challenges } = this.state as LandingPageState;
    return {
      challenges: [...challenges.slice(1), challenges[0]],
    };
  }

  @MutationAction
  moveRightTestimonials() {
    const { testimonials } = this.state as LandingPageState;
    return {
      testimonials: [
        testimonials[testimonials.length - 1],
        ...testimonials.slice(0, testimonials.length - 1),
      ],
    };
  }

  @MutationAction
  moveLeftTestimonials() {
    const { testimonials } = this.state as LandingPageState;
    return {
      testimonials: [...testimonials.slice(1), testimonials[0]],
    };
  }

  @MutationAction
  async confirmEmail(context: NuxtContext) {
    let confirmedEmail = false;
    const { route, $emailConfirmation, $strapi } = context;
    if (route.query.confirmEmail && route.query.confirmEmail.length > 20) {
      const confirmEmail = await $emailConfirmation(
        route.query.confirmEmail as string
      );
      if (confirmEmail) {
        const { user, jwt } = confirmEmail;
        await $strapi.setUser(user);
        await $strapi.setToken(jwt);
        confirmedEmail = true;
      }
    }
    return {
      confirmedEmail,
    };
  }

  @MutationAction
  async passwordlessLogin(context: NuxtContext) {
    let passwordless = false;
    const { route, $loginPasswordless, $strapi } = context;
    if (route.query.loginToken && route.query.loginToken.length > 20) {
      const loginPasswordLess = await $loginPasswordless(
        route.query.loginToken as string
      );
      if (loginPasswordLess !== null) {
        const { user, jwt } = loginPasswordLess;
        await $strapi.setUser(user);
        await $strapi.setToken(jwt);
        passwordless = true;
      }
    }
    return {
      passwordless,
    };
  }
}
