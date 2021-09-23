import {
  NuxtStrapiLoginData,
  NuxtStrapiLoginResult,
} from "@nuxtjs/strapi/types/types";
import { Criterions } from "~/models/Criterions";
import { Directions } from "~/models/Directions";
import { Badges } from "~/models/Badges";
import { userChallenges } from "~/models/UserChallenges";
import { Positions } from "~/models/Positions";
import { Invites } from "~/models/Invites";
import { Technology } from "~/models/Technology";
import { Applications } from "~/models/Applications";
import { Estimation } from "~/models/Estimation";
import { Specialisation } from "~/models/Specialisation";
import { Experience } from "~/models/Experience";
import { Profile } from "~/models/Profile";
import { NotificationUser } from "~/models/NotificationUser";
import { Feedbacks } from "~/models/Feedbacks";
import { AskFeedbacks } from "~/models/AskFeedbacks";
import { Notification } from "~/models/Notification";
import { UserNotification } from "~/models/UserNotifications";
import { Challenge } from "~/models/Challenge";
import { Startup } from "~/models/Startup";
import { Testimonial } from "~/models/Testimonial";
import { Links } from "~/models/Links";
import { Releases } from "~/models/Releases";
import { Sources } from "~/models/Sources";
import { Solutions } from "~/models/Solution";
import { Secrets } from "~/models/Secrets";
import { Like } from "~/models/Like";

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

  $updateStatusPosition(
    id: string,
    status: string
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

  $profileByUserId(id: string): Promise<Partial<Profile>[]>;

  $expertProfiles(): Promise<Partial<Profile>[]>;

  $profileBySlug(slug: string): Promise<Partial<Profile>[]>;

  $users(): Promise<Partial<NotificationUser>[]>;

  $feedbacksByStartupID(id: string): Promise<Partial<Feedbacks>[]>;

  $newFeedbacksByStartupID(id: string): Promise<Partial<Feedbacks>[]>;

  $feedbacks(): Promise<Partial<Feedbacks>[]>;

  $feedbackById(id: string): Promise<Partial<Feedbacks>[]>;

  $updateFeedback(id: string, badges: []): Promise<Partial<Feedbacks>[]>;

  $publicFeedback(id: string): Promise<Partial<Feedbacks>[]>;

  $unPublicFeedback(id: string): Promise<Partial<Feedbacks>[]>;

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

  $createNotification(
    creatorId: string,
    message: string,
    link: string,
    type: string
  ): Promise<Partial<Notification>[]>;

  $createUserNotification(
    userId: string,
    notificationId: string
  ): Promise<Partial<Notification>[]>;

  $createNotificationForStartup(
    creatorId: string,
    message: string,
    link: string,
    type: string,
    startup: string
  ): Promise<Partial<Notification>[]>;

  $createNotificationForChallenge(
    creatorId: string,
    message: string,
    link: string,
    type: string,
    challenge: string
  ): Promise<Partial<Notification>[]>;

  $userNotifications(userId: string): Promise<Partial<UserNotification>[]>;

  $markReadNotification(
    notificationId: string
  ): Promise<Partial<UserNotification>[]>;

  $getUserByEmail(email: string): Promise<Partial<NotificationUser>[]>;

  $login(data: NuxtStrapiLoginData): Promise<NuxtStrapiLoginResult>;

  $sendLoginLink(email: NuxtStrapiLoginData): Promise<NuxtStrapiLoginResult>;

  $loginPasswordless(
    token: NuxtStrapiLoginData
  ): Promise<NuxtStrapiLoginResult>;

  $updateUserPassword(
    id: string,
    password: string
  ): Promise<Partial<NotificationUser>[]>;

  $createUser(
    email: string,
    name: string,
    password: String
  ): Promise<Partial<NotificationUser>[]>;

  $emailConfirmation(token: string): Promise<Partial<NotificationUser>[]>;

  $createProfile(
    id: string,
    technologies: Array<string>
  ): Promise<Partial<Profile>[]>;

  $updateProfileName(
    id: string,
    name: Array<string>
  ): Promise<Partial<Profile>[]>;

  $createNewProfile(
    userName: string,
    userId: string
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

  $createChallenge(
    title: string,
    description: string,
    difficulty: string,
    specialisations: Array<string>,
    sources: Array<string>
  ): Promise<Partial<Challenge>[]>;

  $updateChallenge(
    id: string,
    title: string,
    description: string,
    difficulty: string,
    specialisations: Array<string>,
    sources: Array<string>
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

  $updateStateStartup(
    id: string,
    state: string,
    date: string
  ): Promise<Partial<Startup>[]>;

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

  $releases(id: string): Promise<Partial<Releases>[]>;

  $deleteRelease(id: string): Promise<Partial<Releases>>;

  $createRelease(
    title: string,
    url: string,
    startupId: string
  ): Promise<Partial<Releases>[]>;

  $updateRelease(
    id: string,
    title: string,
    url: string
  ): Promise<Partial<Releases>[]>;

  $sources(id: string): Promise<Partial<Sources>[]>;

  $deleteSource(id: string): Promise<Partial<Sources>>;

  $createSource(
    title: string,
    link: string,
    startupId: string
  ): Promise<Partial<Sources>[]>;

  $createSourceForChallenge(
    title: string,
    link: string
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
