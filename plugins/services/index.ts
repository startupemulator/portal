import { Context, Plugin } from "@nuxt/types";

import { Inject } from "@nuxt/types/app";
import {
  createSolution,
  deleteSolution,
  solutions,
  updateSolution,
} from "./solutions";
import {
  deleteUserChallenges,
  userChallengesById,
  userChallengesByUserId,
} from "./user-challenges";
import {
  addTechnologiesStartup,
  deleteDraft,
  filterStartup,
  finishStartup,
  myStartups,
  startup,
  startupByAcceptedApplication,
  startupById,
  startups,
  updateStartupInfo,
  updateStateStartup,
} from "~/plugins/services/startups";
import {
  challenge,
  challenges,
  createChallenge,
  updateChallenge,
} from "~/plugins/services/challenges";
import { estimations } from "~/plugins/services/estimations";
import { experiences } from "~/plugins/services/experiences";
import { testimonials } from "~/plugins/services/testimonials";
import { specialisations } from "~/plugins/services/specialisations";
import {
  createTechnologies,
  myTechnologies,
  technologies,
} from "~/plugins/services/technologies";
import {
  updateProfileName,
  expertProfiles,
  profile,
  profileBySlug,
  profileByUserId,
  updateProfile,
} from "~/plugins/services/profile";

import {
  createUser,
  emailConfirmation,
  getUserByEmail,
  updateUserPassword,
  createPassword,
  users,
  passwordType,
} from "~/plugins/services/user";
import {
  login,
  loginPasswordless,
  sendLoginLink,
} from "~/plugins/services/login";
import {
  askFeedbacks,
  askFeedbacksByChallengeId,
  askFeedbacksByStartupId,
  askFeedbacksForChallenges,
  askFeedbacksForStartup,
  createAskFeedbackForChallenge,
  createAskFeedbackForStartup,
} from "~/plugins/services/ask-feedbacks";
import {
  createFeedback,
  feedbackById,
  feedbacks,
  feedbacksByStartupID,
  newFeedbacksByStartupID,
  publicFeedback,
  unPublicFeedback,
  updateFeedback,
} from "~/plugins/services/feedbacks";
import {
  createNotification,
  createNotificationForChallenge,
  createNotificationForStartup,
  createUserNotification,
  markReadNotification,
  userNotifications,
} from "~/plugins//services/notifications";

import {
  applicationAccept,
  applicationAdvancedAccess,
  applicationDecline,
  applications,
  applicationsByStartupId,
  cancelApplication,
} from "~/plugins/services/applications";
import {
  createPosition,
  deletePositions,
  positions,
  updatePosition,
  updateStatusPosition,
} from "~/plugins/services/positions";
import { createInvite, deleteInvite } from "~/plugins/services/invites";

import {
  createLink,
  deleteLink,
  links,
  updateLink,
} from "~/plugins/services/Links";
import {
  createRelease,
  deleteRelease,
  releases,
  updateRelease,
} from "~/plugins/services/releases";

import {
  createSource,
  createSourceForChallenge,
  deleteSource,
  sources,
  updateSource,
} from "~/plugins/services/sources";

import {
  createSecret,
  deleteSecret,
  secrets,
  updateSecret,
} from "~/plugins/services/secrets";

import { createLike, deleteLike } from "~/plugins/services/likes";
import { directions } from "~/plugins/services/directions";
import { badges } from "~/plugins/services/badges";
import {
  createCriterions,
  deleteCriterions,
  updateCriterions,
} from "~/plugins/services/criterions";

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
  inject("updateStatusPosition", updateStatusPosition(ctx.$strapi));

  inject("createPosition", createPosition(ctx.$strapi));
  inject("deletePositions", deletePositions(ctx.$strapi));

  inject("links", links(ctx.$strapi));
  inject("updateLink", updateLink(ctx.$strapi));
  inject("createLink", createLink(ctx.$strapi));
  inject("deleteLink", deleteLink(ctx.$strapi));

  inject("releases", releases(ctx.$strapi));
  inject("updateRelease", updateRelease(ctx.$strapi));
  inject("createRelease", createRelease(ctx.$strapi));
  inject("deleteRelease", deleteRelease(ctx.$strapi));

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
  inject("createSourceForChallenge", createSourceForChallenge(ctx.$strapi));

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
  inject("createChallenge", createChallenge(ctx.$strapi));
  inject("updateChallenge", updateChallenge(ctx.$strapi));

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
  inject("profileByUserId", profileByUserId(ctx.$strapi));

  inject("expertProfiles", expertProfiles(ctx.$strapi));

  inject("profileBySlug", profileBySlug(ctx.$strapi));

  inject("updateProfile", updateProfile(ctx.$strapi));
  inject("updateProfileName", updateProfileName(ctx.$strapi));

  inject("emailConfirmation", emailConfirmation(ctx.$strapi));
  inject("passwordType", passwordType(ctx.$strapi));

  inject("users", users(ctx.$strapi));
  inject("getUserByEmail", getUserByEmail(ctx.$strapi));

  inject("createUser", createUser(ctx.$strapi));

  inject("updateUserPassword", updateUserPassword(ctx.$strapi));
  inject("createPassword", createPassword(ctx.$strapi));

  inject("login", login(ctx.$strapi));
  inject("sendLoginLink", sendLoginLink(ctx.$strapi));
  inject("loginPasswordless", loginPasswordless(ctx.$strapi));

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
  inject("unPublicFeedback", unPublicFeedback(ctx.$strapi));

  inject("feedbacksByStartupID", feedbacksByStartupID(ctx.$strapi));
  inject("newFeedbacksByStartupID", newFeedbacksByStartupID(ctx.$strapi));

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
  inject("createNotification", createNotification(ctx.$strapi));
  inject("createUserNotification", createUserNotification(ctx.$strapi));
  inject(
    "createNotificationForStartup",
    createNotificationForStartup(ctx.$strapi)
  );
  inject(
    "createNotificationForChallenge",
    createNotificationForChallenge(ctx.$strapi)
  );
  inject("userNotifications", userNotifications(ctx.$strapi));
  inject("markReadNotification", markReadNotification(ctx.$strapi));

  inject("createLike", createLike(ctx.$strapi));
  inject("deleteLike", deleteLike(ctx.$strapi));
};

export default strapiServices;
