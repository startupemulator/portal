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
  githubLogin: boolean;
}

@Module({ name: "Landing", namespaced: true })
export default class LandingPage
  extends VuexModule
  implements LandingPageState
{
  state: LandingPageState;
  passwordless = false;
  githubLogin = false;
  confirmedEmail = false;
  startups: Startup[] = [];
  challenges: Challenge[] = [];
  technologies: Technology[] = [];
  testimonials: Testimonial[] = [];
  settings: Settings = {};

  @MutationAction({
    mutate: [
      "settings",
      "startups",
      "challenges",
      "testimonials",
      "technologies",
    ],
  })
  async init(context: NuxtContext) {
    const settings = await context.$settings();
    const { startups } = await context.$startups();
    const { challenges } = await context.$challenges();
    const { testimonials } = await context.$testimonials();
    const { technologies } = await context.$technologies();
    return { startups, challenges, testimonials, technologies, settings };
  }

  @MutationAction({ mutate: ["startups"] })
  async moveRightStartups() {
    const { startups } = await this.state;
    return {
      startups: [
        startups[startups.length - 1],
        ...startups.slice(0, startups.length - 1),
      ],
    };
  }

  @MutationAction
  async moveLeftStartups() {
    const { startups } = await this.state;
    return {
      startups: [...startups.slice(1), startups[0]],
    };
  }

  @MutationAction
  async moveRightChallenges() {
    const { challenges } = await this.state;
    return {
      challenges: [
        challenges[challenges.length - 1],
        ...challenges.slice(0, challenges.length - 1),
      ],
    };
  }

  @MutationAction
  async moveLeftChallenges() {
    const { challenges } = await this.state;
    return {
      challenges: [...challenges.slice(1), challenges[0]],
    };
  }

  @MutationAction
  async moveRightTestimonials() {
    const { testimonials } = await this.state;
    return {
      testimonials: [
        testimonials[testimonials.length - 1],
        ...testimonials.slice(0, testimonials.length - 1),
      ],
    };
  }

  @MutationAction
  async moveLeftTestimonials() {
    const { testimonials } = await this.state;
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

  @MutationAction
  async authGithub(context: NuxtContext) {
    const githubLogin = false;
    const { route, $strapi } = context;
    if (route.query.access_token && route.query.access_token.length > 10) {
      try {
        await $strapi.clearToken();
        const data: { jwt: string; user: any } = await $strapi.$http.$get(
          "/auth/github/callback",
          {
            searchParams: { access_token: route.query.access_token } as any,
          }
        );
        await $strapi.setUser(data.user);
        await $strapi.setToken(data.jwt);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      githubLogin,
    };
  }
}
