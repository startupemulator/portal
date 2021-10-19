import { Directions } from "~/models/Directions";
import { userChallenges } from "~/models/UserChallenges";
import { Positions } from "~/models/Positions";
import { Invites } from "~/models/Invites";
import { Technology } from "~/models/Technology";
import { Estimation } from "~/models/Estimation";
import { Specialisation } from "~/models/Specialisation";
import { Experience } from "~/models/Experience";
import { Profile } from "~/models/Profile";
import { User } from "~/models/User";
import { Feedbacks } from "~/models/Feedbacks";
import { AskFeedbacks } from "~/models/AskFeedbacks";
import { Notification } from "~/models/Notification";
import { UserNotification } from "~/models/UserNotifications";
import { Startup } from "~/models/Startup";
import { Testimonial } from "~/models/Testimonial";
import { Links } from "~/models/Links";
import { Releases } from "~/models/Releases";
import { Sources } from "~/models/Sources";
import { Solutions } from "~/models/Solution";
import { Secrets } from "~/models/Secrets";
import { Like } from "~/models/Like";
import { ApplicationsServices } from "~/plugins/services/applications";
import { BadgesServices } from "~/plugins/services/badges";
import { ChallengesServices } from "~/plugins/services/challenges";
import { CriterionsServices } from "~/plugins/services/criterions";
import { DirectionsServices } from "~/plugins/services/directions";
import { EstimationsServices } from "~/plugins/services/estimations";
import { ExperiencesServices } from "~/plugins/services/experiences";
import { AskFeedbacksServices } from "~/plugins/services/ask-feedbacks";
import { FeedbacksServices } from "~/plugins/services/feedbacks";
import { InvitesServices } from "~/plugins/services/invites";
import { LikesServices } from "~/plugins/services/likes";
import { LinksServices } from "~/plugins/services/links";
import { LoginServices } from "~/plugins/services/login";
import { NotificationsServices } from "~/plugins/services/notifications";
import { PositionsServices } from "~/plugins/services/positions";
import { ProfileServices } from "~/plugins/services/profile";
import { ReleasesServices } from "~/plugins/services/releases";
import { SecretsServices } from "~/plugins/services/secrets";
import { SolutionsServices } from "~/plugins/services/solutions";
import { SourcesServices } from "~/plugins/services/sources";
import { TechnologiesServices } from "~/plugins/services/technologies";
import { TestimonialsServices } from "~/plugins/services/testimonials";
import { UserServices } from "~/plugins/services/user";
import { UserChallengesServices } from "~/plugins/services/user-challenges";

export interface Services
  extends ApplicationsServices,
    AskFeedbacksServices,
    BadgesServices,
    ChallengesServices,
    CriterionsServices,
    DirectionsServices,
    EstimationsServices,
    ExperiencesServices,
    FeedbacksServices,
    InvitesServices,
    LikesServices,
    LinksServices,
    LoginServices,
    NotificationsServices,
    PositionsServices,
    ProfileServices,
    ReleasesServices,
    SecretsServices,
    SolutionsServices,
    SourcesServices,
    TechnologiesServices,
    TestimonialsServices,
    UserServices,
    UserChallengesServices {}
