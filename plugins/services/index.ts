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
  startupById,
  startupByAcceptedApplication,
  updateStartupInfo,
  updateStateStartup,
  finishStartup,
  addTechnologiesStartup,
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
import { AskFeedbacks } from "~/models/AskFeedbacks";
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
  profileBySlug,
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
import {
  feedbacksByStartupID,
  feedbacks,
  askFeedbacks,
  createAskFeedbackForStartup,
  createAskFeedbackForChallenge,
  askFeedbacksByChallengeId,
  createFeedback,
  askFeedbacksByStartupId,
  feedbackById,
  updateFeedback,
  publicFeedback,
  askFeedbacksForStartup,
  askFeedbacksForChallenges,
} from "~/plugins/services/feedbacks";
import { notifications } from "~/plugins//services/notifications";

import {
  applications,
  applicationsByStartupId,
  applicationAccept,
  applicationDecline,
  applicationAdvancedAccess,
  cancelApplication,
} from "~/plugins/services/applications";
import {
  positions,
  createPosition,
  deletePositions,
  updatePosition,
} from "~/plugins/services/positions";
import { Positions } from "~/models/Positions";
import { Invites } from "~/models/Invites";
import { createInvite, deleteInvite } from "~/plugins/services/invites";
import { Links } from "~/models/Links";
import {
  links,
  deleteLink,
  createLink,
  updateLink,
} from "~/plugins/services/Links";
import { Sources } from "~/models/Sources";
import { Secrets } from "~/models/Secrets";

import {
  sources,
  deleteSource,
  createSource,
  updateSource,
} from "~/plugins/services/Sources";

import {
  secrets,
  deleteSecret,
  createSecret,
  updateSecret,
} from "~/plugins/services/Secrets";

import { createLike, deleteLike } from "~/plugins/services/likes";
import { Like } from "~/models/Like";
import { userChallenges } from "~/models/UserChallenges";
import {
  userChallengesById,
  userChallengesByUserId,
  deleteUserChallenges,
} from "~/plugins/services/userChallenges";
import { Solutions } from "~/models/Solution";
import {
  solutions,
  deleteSolution,
  createSolution,
  updateSolution,
} from "~/plugins/services/solution";
import { Directions } from "~/models/Directions";
import { directions } from "~/plugins/services/directions";
import { Badges } from "~/models/Badges";
import { badges } from "~/plugins/services/badges";

import { Criterions } from "~/models/Criterions";
import {
  createCriterions,
  updateCriterions,
  deleteCriterions,
} from "~/plugins/services/criterions";

export interface Services {
  $createCriterions(
    mark: string,
    direction: string
  ): Promise<Partial<Criterions>[]>;
  $updateCriterions(id: string, mark: string): Promise<Partial<Criterions>[]>;

  $deleteCriterions(id: string): Promise<Partial<Criterions>>;

  $directions(): Promise<Partial<Directions>[]>;
  $badges(): Promise<Partial<Badges>[]>;
  $userChallengesById(id: string): Promise<Partial<userChallenges>[]>;
  $userChallengesByUserId(id: string): Promise<Partial<userChallenges>[]>;
  $deleteUserChallenges(id: string): Promise<Partial<userChallenges>[]>;

  $positions(id: string): Promise<Partial<Positions>[]>;
  $createInvite(
    email: string,
    position: string,
    startup: string,
    inviter: string
  ): Promise<Partial<Invites>[]>;

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
  $cancelApplication(id: string): Promise<Partial<Applications>[]>;

  $applicationAccept(id: string): Promise<Partial<Applications>[]>;
  $applicationAdvancedAccess(id: string): Promise<Partial<Applications>[]>;

  $applicationDecline(
    id: string,
    declineReason: string
  ): Promise<Partial<Applications>[]>;

  $estimations(): Promise<Partial<Estimation>[]>;
  $specialisations(): Promise<Partial<Specialisation>[]>;
  $experiences(): Promise<Partial<Experience>[]>;
  $profile(id: string): Promise<Partial<Profile>[]>;
  $profileBySlug(slug: string): Promise<Partial<Profile>[]>;

  $users(): Promise<Partial<NotificationUser>[]>;
  $feedbacksByStartupID(id: string): Promise<Partial<Feedbacks>[]>;
  $feedbacks(): Promise<Partial<Feedbacks>[]>;

  $feedbackById(id: string): Promise<Partial<Feedbacks>[]>;
  $updateFeedback(id: string, badges: []): Promise<Partial<Feedbacks>[]>;
  $publicFeedback(id: string): Promise<Partial<Feedbacks>[]>;

  $createFeedback(
    expert: string,
    description: string,
    criterions: Array<string>,
    badges: Array<string>,
    request: string
  ): Promise<Partial<Feedbacks>[]>;
  $askFeedbacksForStartup(): Promise<Partial<AskFeedbacks>[]>;
  $askFeedbacksForChallenges(): Promise<Partial<AskFeedbacks>[]>;
  $askFeedbacks(): Promise<Partial<AskFeedbacks>[]>;
  $askFeedbacksByChallengeId(id: string): Promise<Partial<AskFeedbacks>[]>;
  $askFeedbacksByStartupId(id: string): Promise<Partial<AskFeedbacks>[]>;

  $createAskFeedbackForStartup(
    creator: string,
    comment: string,
    technologies: [],
    startup: string
  ): Promise<Partial<AskFeedbacks>[]>;

  $createAskFeedbackForChallenge(
    creator: string,
    comment: string,
    technologies: [],
    challenge: string
  ): Promise<Partial<AskFeedbacks>[]>;

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
  $addTechnologiesStartup(
    id: string[],
    technologies: Array<string>
  ): Promise<Partial<Startup>[]>;

  $myStartups(states: string[]): Promise<Partial<Startup>[]>;
  $deleteDraft(states: string[]): Promise<Partial<Startup>>;

  $startup(slug: string[]): Promise<Partial<Startup>>;
  $startupById(id: string[]): Promise<Partial<Startup>>;
  $startupByAcceptedApplication(id: string[]): Promise<Partial<Startup>>;
  $updateStartupInfo(
    id: string,
    date: string,
    description: string,
    duration: string,
    title: string
  ): Promise<Partial<Startup>[]>;
  $finishStartup(id: string): Promise<Partial<Startup>[]>;

  $updateStateStartup(id: string, state: string): Promise<Partial<Startup>[]>;

  $filterStartup(id: Array<string>): Promise<Partial<Startup>>;
  $testimonials(): Promise<Partial<Testimonial>[]>;

  $technologies(isPublic: boolean): Promise<Partial<Technology>[]>;
  $createTechnologies(
    creator: number,
    title: string
  ): Promise<Partial<Technology>[]>;

  $myTechnologies(creator: string): Promise<Partial<Technology>[]>;

  $links(id: string): Promise<Partial<Links>[]>;
  $deleteLink(id: string): Promise<Partial<Links>>;
  $createLink(title: string, url: string): Promise<Partial<Links>[]>;
  $updateLink(
    id: string,
    title: string,
    url: string
  ): Promise<Partial<Links>[]>;

  $sources(id: string): Promise<Partial<Sources>[]>;
  $deleteSource(id: string): Promise<Partial<Sources>>;
  $createSource(
    title: string,
    link: string,
    startupId: string
  ): Promise<Partial<Sources>[]>;
  $updateSource(
    id: string,
    title: string,
    link: string
  ): Promise<Partial<Sources>[]>;

  $solutions(id: string): Promise<Partial<Solutions>[]>;
  $deleteSolution(id: string): Promise<Partial<Solutions>>;
  $createSolution(
    title: string,
    url: string,
    request: string
  ): Promise<Partial<Solutions>[]>;
  $updateSolution(
    id: string,
    title: string,
    url: string
  ): Promise<Partial<Solutions>[]>;

  $secrets(id: string): Promise<Partial<Secrets>[]>;
  $deleteSecret(id: string): Promise<Partial<Secrets>>;
  $createSecret(
    title: string,
    description: string,
    startupId: string
  ): Promise<Partial<Secrets>[]>;
  $updateSecret(
    id: string,
    title: string,
    description: string
  ): Promise<Partial<Secrets>[]>;

  $deleteInvite(id: string): Promise<Partial<Invites>>;
  $createLike(feedback: string, user: string): Promise<Partial<Like>[]>;
  $deleteLike(id: string): Promise<Partial<Like>>;
}

const strapiServices: Plugin = (ctx: Context, inject: Inject): void => {
  inject("badges", badges(ctx.$strapi));
  inject("directions", directions(ctx.$strapi));
  inject("estimations", estimations(ctx.$strapi));

  inject("createCriterions", createCriterions(ctx.$strapi));
  inject("updateCriterions", updateCriterions(ctx.$strapi));
  inject("deleteCriterions", deleteCriterions(ctx.$strapi));

  inject("userChallengesById", userChallengesById(ctx.$strapi));
  inject("userChallengesByUserId", userChallengesByUserId(ctx.$strapi));
  inject("deleteUserChallenges", deleteUserChallenges(ctx.$strapi));

  inject("positions", positions(ctx.$strapi));
  inject("updatePosition", updatePosition(ctx.$strapi));
  inject("createPosition", createPosition(ctx.$strapi));
  inject("deletePositions", deletePositions(ctx.$strapi));

  inject("links", links(ctx.$strapi));
  inject("updateLink", updateLink(ctx.$strapi));
  inject("createLink", createLink(ctx.$strapi));
  inject("deleteLink", deleteLink(ctx.$strapi));

  inject("secrets", secrets(ctx.$strapi));
  inject("deleteSecret", deleteSecret(ctx.$strapi));
  inject("createSecret", createSecret(ctx.$strapi));
  inject("updateSecret", updateSecret(ctx.$strapi));

  inject("solutions", solutions(ctx.$strapi));
  inject("deleteSolution", deleteSolution(ctx.$strapi));
  inject("createSolution", createSolution(ctx.$strapi));
  inject("updateSolution", updateSolution(ctx.$strapi));

  inject("sources", sources(ctx.$strapi));
  inject("deleteSource", deleteSource(ctx.$strapi));
  inject("createSource", createSource(ctx.$strapi));
  inject("updateSource", updateSource(ctx.$strapi));

  inject("createInvite", createInvite(ctx.$strapi));
  inject("deleteInvite", deleteInvite(ctx.$strapi));

  inject("applications", applications(ctx.$strapi));
  inject("cancelApplication", cancelApplication(ctx.$strapi));

  inject("applicationsByStartupId", applicationsByStartupId(ctx.$strapi));
  inject("applicationAccept", applicationAccept(ctx.$strapi));
  inject("applicationDecline", applicationDecline(ctx.$strapi));
  inject("applicationAdvancedAccess", applicationAdvancedAccess(ctx.$strapi));

  inject("specialisations", specialisations(ctx.$strapi));
  inject("experiences", experiences(ctx.$strapi));

  inject("challenges", challenges(ctx.$strapi));
  inject("challenge", challenge(ctx.$strapi));

  inject("startups", startups(ctx.$strapi));
  inject("addTechnologiesStartup", addTechnologiesStartup(ctx.$strapi));

  inject("startupById", startupById(ctx.$strapi));
  inject("filterStartup", filterStartup(ctx.$strapi));

  inject("myStartups", myStartups(ctx.$strapi));
  inject("finishStartup", finishStartup(ctx.$strapi));

  inject(
    "startupByAcceptedApplication",
    startupByAcceptedApplication(ctx.$strapi)
  );

  inject("deleteDraft", deleteDraft(ctx.$strapi));
  inject("startup", startup(ctx.$strapi));
  inject("updateStartupInfo", updateStartupInfo(ctx.$strapi));
  inject("updateStateStartup", updateStateStartup(ctx.$strapi));

  inject("profile", profile(ctx.$strapi));
  inject("profileBySlug", profileBySlug(ctx.$strapi));

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
  inject("askFeedbacksForStartup", askFeedbacksForStartup(ctx.$strapi));
  inject("askFeedbacksForChallenges", askFeedbacksForChallenges(ctx.$strapi));

  inject("feedbackById", feedbackById(ctx.$strapi));
  inject("updateFeedback", updateFeedback(ctx.$strapi));
  inject("publicFeedback", publicFeedback(ctx.$strapi));

  inject("feedbacksByStartupID", feedbacksByStartupID(ctx.$strapi));
  inject("askFeedbacks", askFeedbacks(ctx.$strapi));
  inject("askFeedbacksByChallengeId", askFeedbacksByChallengeId(ctx.$strapi));
  inject("askFeedbacksByStartupId", askFeedbacksByStartupId(ctx.$strapi));

  inject(
    "createAskFeedbackForStartup",
    createAskFeedbackForStartup(ctx.$strapi)
  );
  inject("createFeedback", createFeedback(ctx.$strapi));
  inject(
    "createAskFeedbackForChallenge",
    createAskFeedbackForChallenge(ctx.$strapi)
  );
  inject("notifications", notifications(ctx.$strapi));

  inject("createLike", createLike(ctx.$strapi));
  inject("deleteLike", deleteLike(ctx.$strapi));
};

export default strapiServices;
