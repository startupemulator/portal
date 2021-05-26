import { Context, Plugin } from "@nuxt/types";

import type {
  NuxtStrapiLoginResult,
  NuxtStrapiLoginData,
} from "@nuxtjs/strapi/types/types";

import { Inject } from "@nuxt/types/app";
import {
  startup,
  startups,
  myStartups,
  deleteDraft,
  filterStartup,
} from "~/plugins/services/startups";
import { Startup } from "~/models/Startup";
import { challenge, challenges } from "~/plugins/services/challenges";
import { Challenge } from "~/models/Challenge";
import { estimations } from "~/plugins/services/estimations";
import { experiences } from "~/plugins/services/experiences";
import { Estimation } from "~/models/Estimation";
import { Experience } from "~/models/Experience";
import { Testimonial } from "~/models/Testimonial";
import { testimonials } from "~/plugins/services/testimonials";
import { specialisations } from "~/plugins/services/specialisations";
import { Specialisation } from "~/models/Specialisation";
import { Feedbacks } from "~/models/Feedbacks";
import {
  myTechnologies,
  technologies,
  createTechnologies,
} from "~/plugins/services/technologies";
import { Technology } from "~/models/Technology";
import { Profile } from "~/models/Profile";
import {
  profile,
  updateProfile,
  createProfile,
} from "~/plugins/services/profile";
import { NotificationUser } from "~/models/NotificationUser";
import { Notification } from "~/models/Notification";
import { Applications } from "~/models/Applications";

import {
  updateUser,
  createUser,
  users,
  getUserBySlug,
  updateUserPassword,
} from "~/plugins/services/user";
import { login } from "~/plugins/services/login";
import { feedbacks } from "~/plugins/services/feedbacks";
import { notifications } from "~/plugins//services/notifications";

import {
  applications,
  applicationsByStartupId,
  applicationAccept,
  applicationDecline,
} from "~/plugins/services/applications";
import {
  positions,
  createPosition,
  deletePositions,
  updatePosition,
} from "~/plugins/services/positions";
import { Positions } from "~/models/Positions";
export interface Services {
  $positions(id: string): Promise<Partial<Positions>[]>;
  $createPosition(
    startup: string,
    technologies: Array<Technology>,
    specialisation: string
  ): Promise<Partial<Positions>[]>;
  $deletePositions(id: string): Promise<Partial<Positions>>;
  $updatePosition(
    id: string,
    technologies: Array<Technology>,
    specialisation: string
  ): Promise<Partial<Positions>[]>;
  $applications(): Promise<Partial<Applications>[]>;

  $applicationsByStartupId(id: string): Promise<Partial<Applications>[]>;
  $applicationAccept(id: string): Promise<Partial<Applications>[]>;
  $applicationDecline(
    id: string,
    declineReason: string
  ): Promise<Partial<Applications>[]>;

  $estimations(): Promise<Partial<Estimation>[]>;
  $specialisations(): Promise<Partial<Specialisation>[]>;
  $experiences(): Promise<Partial<Experience>[]>;
  $profile(id: string): Promise<Partial<Profile>[]>;
  $users(): Promise<Partial<NotificationUser>[]>;
  $feedbacks(): Promise<Partial<Feedbacks>[]>;
  $notifications(): Promise<Partial<Notification>[]>;
  $getUserBySlug(slug: string): Promise<Partial<NotificationUser>[]>;
  $login(data: NuxtStrapiLoginData): Promise<NuxtStrapiLoginResult>;
  $updateUserPassword(
    id: string,
    password: string
  ): Promise<Partial<NotificationUser>[]>;
  $createUser(
    email: string,
    name: string,
    password: String
  ): Promise<Partial<NotificationUser>[]>;
  $updateUser(
    id: string,
    username: string
  ): Promise<Partial<NotificationUser>[]>;
  $createProfile(
    id: string,
    technologies: Array<string>
  ): Promise<Partial<Profile>[]>;
  $updateProfile(
    id: string,
    technologies: Array<string>,
    experience: string
  ): Promise<Partial<Profile>[]>;
  $challenges(
    difficulty: number[],
    specialisations: number[]
  ): Promise<Partial<Challenge>[]>;

  $challenge(slug: string): Promise<Partial<Challenge>>;

  $startups(states: string[]): Promise<Partial<Startup>[]>;
  $myStartups(states: string[]): Promise<Partial<Startup>[]>;
  $deleteDraft(states: string[]): Promise<Partial<Startup>>;

  $startup(slug: string[]): Promise<Partial<Startup>>;
  $filterStartup(id: Array<string>): Promise<Partial<Startup>>;
  $testimonials(): Promise<Partial<Testimonial>[]>;

  $technologies(isPublic: boolean): Promise<Partial<Technology>[]>;
  $createTechnologies(
    creator: number,
    title: string
  ): Promise<Partial<Technology>[]>;

  $myTechnologies(creator: string): Promise<Partial<Technology>[]>;
}

const strapiServices: Plugin = (ctx: Context, inject: Inject): void => {
  inject("estimations", estimations(ctx.$strapi));
  inject("positions", positions(ctx.$strapi));
  inject("updatePosition", updatePosition(ctx.$strapi));

  inject("createPosition", createPosition(ctx.$strapi));
  inject("deletePositions", deletePositions(ctx.$strapi));

  inject("applications", applications(ctx.$strapi));
  inject("applicationsByStartupId", applicationsByStartupId(ctx.$strapi));
  inject("applicationAccept", applicationAccept(ctx.$strapi));
  inject("applicationDecline", applicationDecline(ctx.$strapi));

  inject("specialisations", specialisations(ctx.$strapi));
  inject("experiences", experiences(ctx.$strapi));

  inject("challenges", challenges(ctx.$strapi));
  inject("challenge", challenge(ctx.$strapi));

  inject("startups", startups(ctx.$strapi));
  inject("filterStartup", filterStartup(ctx.$strapi));

  inject("myStartups", myStartups(ctx.$strapi));
  inject("deleteDraft", deleteDraft(ctx.$strapi));
  inject("startup", startup(ctx.$strapi));

  inject("profile", profile(ctx.$strapi));
  inject("updateProfile", updateProfile(ctx.$strapi));
  inject("createProfile", createProfile(ctx.$strapi));

  inject("updateUser", updateUser(ctx.$strapi));
  inject("users", users(ctx.$strapi));
  inject("getUserBySlug", getUserBySlug(ctx.$strapi));

  inject("createUser", createUser(ctx.$strapi));

  inject("updateUserPassword", updateUserPassword(ctx.$strapi));

  inject("login", login(ctx.$strapi));

  inject("testimonials", testimonials(ctx.$strapi));

  inject("technologies", technologies(ctx.$strapi));
  inject("myTechnologies", myTechnologies(ctx.$strapi));
  inject("createTechnologies", createTechnologies(ctx.$strapi));

  inject("feedbacks", feedbacks(ctx.$strapi));
  inject("notifications", notifications(ctx.$strapi));
};

export default strapiServices;
