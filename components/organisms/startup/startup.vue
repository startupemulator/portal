<template>
  <div>
    <RequestToTeam
      v-show="requestToTeam"
      :update-key="updateKey"
      :startup="updatableDataStartup"
      @clikOnButton="toggleRequestToTeam"
      @accept="accept"
      @decline="decline"
      @advancedAccess="advancedAccess"
    ></RequestToTeam>
    <NewFeedBack
      v-show="newFeedBack"
      :key="updateKey + 'new-feedback'"
      :feedbacks="feedbacksData"
      :user-id="userId"
      :is-expert="isExpert"
      :is-owner="isOwner"
      :new-feed-backs="feedbacksData.length"
      @clikOnButton="toggleNewFeedBack"
      @updateFeedbacks="updateFeedbacks"
      @requestFeedback="requestFeedback"
    ></NewFeedBack>
    <RequestFeedback
      v-show="requestFeedBack"
      :key="updateKey"
      :startup="updatableDataStartup"
      :user-id="userId"
      @clikOnButton="toggleRequestFeedBack"
      @createFedbackNotification="createFedbackNotification"
    ></RequestFeedback>
    <EditStartupInfo
      v-show="editStartupInfo"
      :startup="updatableDataStartup"
      :estimations="estimations"
      @updateStartup="updateStartup($event)"
      @clikOnButton="toggleEditStartupInfo"
      @cancelEditStartupInfo="cancelEditStartupInfo"
    ></EditStartupInfo>
    <EditTeam
      v-if="editTeam"
      :update-key="updateKey"
      :staffed-position="staffedPosition"
      :startup="updatableDataStartup"
      :specialisations="specialisations"
      :technologies="technologies"
      :startup-id="moveAwayStartup"
      :team-member="teamMember"
      @clikOnButton="toggleEditTeam"
      @chagePremission="chagePremission"
      @saveEditTeam="saveEditTeam"
      @cancelEditTeam="cancelEditTeam"
      @changeTeam="changeTeam"
      @removeUserMember="removeUserMember"
    ></EditTeam>
    <EditSources
      v-show="editSources"
      :sources="updatableDataStartup.sources"
      :startup-id="moveAwayStartup"
      @clikOnButton="toggleEditSources"
      @saveSources="saveSources"
      @cancelSources="cancelSources"
    ></EditSources>
    <EditGuide
      v-show="editGuide"
      :secrets="updatableDataStartup.secrets"
      :startup-id="moveAwayStartup"
      @clikOnButton="toggleEditGuide"
      @saveGuide="saveGuide"
    ></EditGuide>
    <FinishStartup
      v-show="finishStartup"
      @clikOnButton="toggleFinishStartup"
      @finishStartup="finishThisStartup"
    ></FinishStartup>
    <AddReleseLinks
      v-show="releaseLikns"
      :startup-id="startup.id"
      :releases="releases"
      @clikOnButton="toggleReleaseLikns"
      @saveReleaseLinks="saveReleaseLinks"
    ></AddReleseLinks>
    <AddTeamFeedBack
      v-show="addTeamFeedBack"
      :key="updateKey + 'addFeedback'"
      :title="feedBackTitle"
      :badges="badges"
      :request-id="askFeedbacks ? askFeedbacks[0].id : null"
      :expert-id="userId"
      :directions="directions"
      @clikOnButton="toggleAddTeamFeedBack"
      @teamNotificationFeedback="teamNotificationFeedback"
    ></AddTeamFeedBack>

    <AddTeamBadge
      v-show="addTeamBadge"
      :badges="badges"
      :title="badgeTitle"
      @clikOnButton="toggleAddTeamBadge"
    ></AddTeamBadge>
    <AddTeamBadge
      v-show="addFeedBackBadge"
      :badges="badges"
      :feedback-id="feedbackIdForAddBadge"
      @clikOnButton="closeAddFeedBackBadge"
      @addedBadge="closeAddFeedBackBadge"
    ></AddTeamBadge>
    <div
      v-show="
        !requestToTeam &&
        !newFeedBack &&
        !requestFeedBack &&
        !editStartupInfo &&
        !editTeam &&
        !editSources &&
        !editGuide &&
        !finishStartup &&
        !releaseLikns &&
        !addTeamFeedBack &&
        !addTeamBadge &&
        !addFeedBackBadge
      "
      class="startup"
      :class="
        isStarted && (isDeveloper || isOwner || isExpert)
          ? 'startup-started'
          : ''
      "
    >
      <div class="startup_block-1">
        <U-back :title="'Startups'" :link="'/startups'"></U-back>

        <div class="startup__header">
          <U-title :text="'Startup #' + updatableDataStartup.id"></U-title>
          <div
            class="startup__header__startup-state"
            :class="isStarted ? 'started' : finished ? 'finished' : ''"
          >
            {{ updatableDataStartup.state.split("_").join(" ") | capitalize }}
          </div>
        </div>
        <div class="startup-card__started-start-time">
          <div class="started-start-time__start">
            <h3>Start</h3>
            <p>
              {{
                new Date(updatableDataStartup.start_date)
                  .toUTCString()
                  .substr(4, 12)
              }}
            </p>
          </div>
          <div class="started-start-time__duration">
            <h3>Duration</h3>
            <p>{{ updatableDataStartup.duration }} days</p>
          </div>
        </div>
        <div v-if="isDeveloper && !finished" class="applied-startup">
          <div v-if="!isStarted" class="applied-startup__not-started">
            <h4>
              You applied to this startup as a
              <span>{{ developerPosition }}</span>
            </h4>
            <button type="button" @click="togglepopupCancelApplication">
              <span>Cancel Application</span>
              <img src="~/assets/img/arrow.svg" alt="arrow" />
            </button>
          </div>
          <div v-if="isStarted" class="applied-startup__started">
            <button type="button" @click="togglePopupGuide">
              <span>Show Guide</span>
              <img src="~/assets/img/arrow.svg" alt="arrow" />
            </button>
            <button type="button" @click="togglepopupLeaveProject">
              <span>Leave Project</span>
              <img src="~/assets/img/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>
        <div v-if="isExpert && !isOwner" class="applied-startup">
          <div class="applied-startup__started">
            <button
              type="button"
              @click="toggleAddTeamFeedBack('Add team feedback')"
            >
              <span>Add Team Feedback</span>
              <img src="~/assets/img/arrow.svg" alt="arrow" />
            </button>
            <button type="button" @click="toggleAddTeamBadge('Add team badge')">
              <span>Add Team Badge</span>
              <img src="~/assets/img/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>

        <p class="startup__description">
          {{ updatableDataStartup.description }}
        </p>
        <div>
          <CommentExpert
            v-if="isExpert && askFeedbacks !== null"
            :solution-data="askFeedbacks"
          ></CommentExpert>
        </div>

        <div v-if="isOwner && !finished" class="owner-menu">
          <ul class="owner-menu__list">
            <li v-if="!review && !finished" class="owner-menu__item">
              <nuxt-link :to="'/startup/requestsToTeam/' + startup.slug">
                <span
                  >Requests to Team
                  <div class="owner-menu__item--message">
                    <span>{{
                      updatableDataApplications.filter(
                        (el) => el.status === "waiting"
                      ).length
                    }}</span>
                  </div></span
                >
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </nuxt-link>
            </li>
            <li v-if="!review && isStarted" class="owner-menu__item">
              <button type="button" @click="toggleNewFeedBack">
                <span
                  >Expert Feedback
                  <div class="owner-menu__item--message">
                    <span>{{ feedbacksData.length }} </span>
                  </div></span
                >
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li v-if="!review" class="owner-menu__item">
              <button
                v-if="!isStarted"
                type="button"
                @click="togglepopupDeleteOrStartStartup('start')"
              >
                <span>Start Startup</span>

                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
              <button
                v-if="isStarted"
                type="button"
                @click="toggleRequestFeedBack"
              >
                <span>Request Feedback</span>
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li class="owner-menu__item">
              <button type="button" @click="toggleEditStartupInfo">
                <span>Edit Startup Info</span>
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li class="owner-menu__item">
              <button type="button" @click="toggleEditTeam">
                <span>Edit Team</span>
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li class="owner-menu__item">
              <button type="button" @click="toggleEditSources">
                <span>Edit Sources</span>
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li class="owner-menu__item">
              <button type="button" @click="toggleEditGuide">
                <span>Edit Guide</span>
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li class="owner-menu__item">
              <button
                v-if="!isStarted"
                type="button"
                @click="togglepopupDeleteOrStartStartup"
              >
                <span>Delete Startup</span>

                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
              <button
                v-if="isStarted"
                type="button"
                @click="toggleFinishStartup"
              >
                <span>Finish Startup</span>
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
          </ul>
        </div>
        <div
          v-if="finished && (releases.length !== 0 || isOwner)"
          class="owner-menu"
        >
          <ul class="owner-menu__list">
            <li v-if="isOwner" class="owner-menu__item">
              <button type="button" @click="toggleReleaseLikns">
                <span>Add Release Links </span>
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li
              v-for="link in releases"
              :key="link.id + link.title"
              class="owner-menu__item"
            >
              <button type="button">
                <a :href="link.url" target="_blank">
                  <span>{{ link.title }} </span>

                  <img src="~/assets/img/arrow.svg" alt="arrow"
                /></a>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="startup_block-2"
        :style="finished && isOwner ? 'order:3' : ''"
      >
        <div
          v-if="openPosition.length > 0 && !finished"
          class="startup__open-position"
        >
          <h3>Open positions</h3>
          <Open-position-card
            v-for="item in openPosition"
            :key="item.id + 'open-position'"
            :position="item"
            :is-expert="isExpert"
            :slug="updatableDataStartup.slug"
            :is-owner="isOwner"
            :is-developer="isDeveloper"
          ></Open-position-card>
        </div>
        <div v-cloak class="startup-card__team">
          <h3>Team</h3>
          <ProjectParticipant
            :username="updatableDataStartup.owner"
            :is-owner="true"
          ></ProjectParticipant>
          <div
            v-if="teamMember.length > 0 && (isStarted || finished)"
            class="team"
          >
            <ProjectParticipant
              v-for="item in teamMember"
              :key="item.id + 'project-participant' + updateKey"
              :position="item.specialisation.title"
              :username="item.applications"
            ></ProjectParticipant>
          </div>
        </div>
      </div>
      <div v-if="isStarted || finished" class="startup_block-3">
        <Sources :finished="finished" :startup="updatableDataStartup"></Sources>
        <div class="startup-card__activity">
          <h3>Activity</h3>
          <div v-if="finished" class="project-started">
            <h4>Project finished</h4>
            <p>
              {{
                new Date(updatableDataStartup.start_date)
                  .toUTCString()
                  .substr(4, 18)
              }}
            </p>
          </div>
          <FeedBackCard
            v-for="feedback in updatableFeedbacks.slice(0, maxLengthActivity)"
            :key="feedback.id + 'feedback'"
            :feedback="feedback"
            :is-expert="isExpert"
            :user-id="userId"
            @updateFeedbacks="updateFeedbacks"
            @addFeedback="toggleAddTeamFeedBack"
            @addBadge="addFeedbackBadge"
          ></FeedBackCard>
        </div>

        <U-button
          v-if="updatableFeedbacks.length > maxLengthActivity"
          :button-name="`Show ${
            updatableFeedbacks.length - maxLengthActivity > 3
              ? 3
              : updatableFeedbacks.length - maxLengthActivity
          } Earlier Actions`"
          :button-class="'u-button-gray button-show-earlier-actions'"
          @clickOnButton="showMore"
        ></U-button>

        <div class="project-started">
          <h4>Project started</h4>
          <p>
            {{
              new Date(updatableDataStartup.start_date)
                .toUTCString()
                .substr(4, 18)
            }}
          </p>
        </div>
      </div>
      <div
        v-if="!isOwner && !isDeveloper && !isExpert"
        class="position-card__developer__primary-button"
      >
        <U-button
          :button-name="'Apply to Teams'"
          :button-class="'u-button-blue'"
        ></U-button>
      </div>
      <div v-show="popupCancelApplication" class="popup-cancel-application">
        <div class="popup-cancel-application__content">
          <h4>Cancel your application?</h4>
          <button
            type="button"
            class="sign-up-link__close"
            @click="togglepopupCancelApplication"
          >
            <img src="~/assets/img/close.svg" alt="Close" />
          </button>

          <div class="popup-cancel-application__buttons">
            <U-button
              :button-name="'Yes, Cancel'"
              :button-class="'u-button-blue'"
              @clickOnButton="$emit('cancelApplication')"
            ></U-button>
            <U-button
              :button-name="'No, Don’t Cancel'"
              :button-class="'u-button-gray'"
              @clickOnButton="togglepopupCancelApplication"
            ></U-button>
          </div>
        </div>
      </div>
      <PopupDeleteOrStartStartup
        v-show="popupDeleteOrStartStartup"
        :move-away-startup="moveAwayStartup"
        :move-away-startup-name="moveAwayStartupName"
        :is-start-startup="isStartStartup"
        @clickOnButton="togglepopupDeleteOrStartStartup"
        @closePopupLinkEmail="togglepopupDeleteOrStartStartup"
        @deleteStartup="deleteStartup"
        @startStartup="startStartup('in_progress')"
      ></PopupDeleteOrStartStartup>
      <GuidePopup
        v-if="popupGuide"
        :startup="updatableDataStartup"
        @closePopup="togglePopupGuide"
      ></GuidePopup>
    </div>
    <PopupLeaveProject
      v-if="popupLeaveProject"
      @closePopupLeaveproject="togglepopupLeaveProject"
      @leveProject="leveProject"
    ></PopupLeaveProject>
    <Spiner :loading="loading"></Spiner>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import FeedBackCard from "../../molecules/feedbackCard.vue";
import GuidePopup from "../../molecules/popupGuide.vue";
import { Estimation } from "../../../models/Estimation";
import RequestToTeam from "./requestsToTeam.vue";
import newFeedBack from "./newFeedBack.vue";
import RequestFeedback from "./requestFeedback.vue";
import EditStartupInfo from "./editStartupInfo.vue";
import EditTeam from "./editTeam.vue";
import EditSources from "./editSources.vue";
import AddReleseLinks from "./addReleseLinks.vue";
import EditGuide from "./editGuide.vue";
import FinishStartup from "./finishStartup.vue";
import AddTeamFeedBack from "./addTeamFeedback.vue";
import AddTeamBadge from "./addTeamBadge.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import OpenPositionCard from "~/components/molecules/openPositionCard.vue";
import { Startup } from "~/models/Startup";
import UButton from "~/components/atoms/uButton.vue";
import PopupDeleteOrStartStartup from "~/components/molecules/PopupDeleteOrStartStartup.vue";
import ProjectParticipant from "~/components/molecules/projectParticipant.vue";
import Sources from "~/components/molecules/sources.vue";
import CommentExpert from "~/components/molecules/commentForExpert.vue";
import { Feedbacks } from "~/models/Feedbacks";
import { Specialisation } from "~/models/Specialisation";
import { Technology } from "~/models/Technology";
import { Applications } from "~/models/Applications";
import Toast from "~/store/modules/Toast";
import Spiner from "~/components/molecules/spiner.vue";
import { AskFeedbacks } from "~/models/AskFeedbacks";
import { Directions } from "~/models/Directions";
import { Badges } from "~/models/Badges";
import { Releases } from "~/models/Releases";
import { scrollToHeader } from "~/assets/jshelper/scrollToHeader.js";
import PopupLeaveProject from "~/components/molecules/popupLeaveProject.vue";
@Component({
  components: {
    UBack,
    UButton,
    UTitle,
    OpenPositionCard,
    PopupDeleteOrStartStartup,
    ProjectParticipant,
    FeedBackCard,
    GuidePopup,
    RequestToTeam,
    Sources,
    newFeedBack,
    RequestFeedback,
    EditStartupInfo,
    EditTeam,
    EditSources,
    AddReleseLinks,
    EditGuide,
    FinishStartup,
    AddTeamFeedBack,
    AddTeamBadge,
    CommentExpert,
    Spiner,
    PopupLeaveProject,
  },
})
export default class extends Vue {
  @Prop() startup!: Array<Startup>;
  @Prop() feedbacks!: Array<Feedbacks>;
  @Prop() isOwner: Boolean;
  @Prop() applications!: Array<Applications>;
  @Prop() isDeveloper: Boolean;
  @Prop() developerPosition: String;
  @Prop() estimations: Array<Estimation>;
  @Prop() specialisations: Array<Specialisation>;
  @Prop() technologies: Array<Technology>;
  @Prop() userId: string;
  @Prop() isExpert: boolean;
  @Prop() askFeedbacks: Array<AskFeedbacks>;
  @Prop() badges: Array<Badges>;
  @Prop() directions: Array<Directions>;
  @Prop() releases: Array<Releases>;
  @Prop() notification: string;

  updatableDataStartup = this.startup;
  updatableDataApplications = this.applications;
  updatableFeedbacks = [];
  openPosition = [];
  staffedPosition = [];
  teamMember = [];
  moveAwayStartup: string = "";
  moveAwayStartupName: string = "";
  popupCancelApplication = false;
  isStartStartup = false;
  feedbacksData = [];
  maxLengthActivity = 3;
  lengthActivity = 0;
  feedBackTitle = "";
  badgeTitle = "";
  feedbackIdForAddBadge = "";
  isStarted = false;
  popupDeleteOrStartStartup = false;
  popupLeaveProject = false;
  popupGuide = false;
  finished = false;
  review = false;
  requestToTeam = false;
  newFeedBack = false;
  requestFeedBack = false;
  editStartupInfo = false;
  editTeam = false;
  editSources = false;
  editGuide = false;
  finishStartup = false;
  releaseLikns = false;
  addTeamFeedBack = false;
  addTeamBadge = false;
  addFeedBackBadge = false;
  loading = false;
  updateKey: Number = 0;

  deleteApplicationCash = [];
  changedPremissionOnTeam = [];
  toggleReleaseLikns() {
    this.releaseLikns = !this.releaseLikns;
    scrollToHeader();
  }

  saveReleaseLinks() {
    this.releaseLikns = !this.releaseLikns;
    scrollToHeader();
    this.$emit("saveReleaseLinks");
  }

  togglepopupLeaveProject() {
    this.popupLeaveProject = !this.popupLeaveProject;
  }

  toggleAddTeamFeedBack(title, feedbackId) {
    this.feedBackTitle = title;
    this.addTeamFeedBack = !this.addTeamFeedBack;
    this.updateKey += 1;
    scrollToHeader();
  }

  toggleAddTeamBadge(title, feedbackId) {
    this.badgeTitle = title;
    this.addTeamBadge = !this.addTeamBadge;
  }

  addFeedbackBadge(data) {
    this.feedbackIdForAddBadge = data;
    this.addFeedBackBadge = !this.addFeedBackBadge;
  }

  closeAddFeedBackBadge() {
    this.addFeedBackBadge = !this.addFeedBackBadge;
    this.updateFeedbacks();
  }

  toggleRequestToTeam() {
    this.requestToTeam = !this.requestToTeam;
  }

  toggleFinishStartup() {
    this.finishStartup = !this.finishStartup;
  }

  toggleEditGuide() {
    this.editGuide = !this.editGuide;
  }

  toggleEditSources() {
    this.editSources = !this.editSources;
  }

  toggleEditTeam() {
    this.editTeam = !this.editTeam;
  }

  toggleEditStartupInfo() {
    this.editStartupInfo = !this.editStartupInfo;
  }

  toggleNewFeedBack() {
    this.newFeedBack = !this.newFeedBack;
  }

  toggleRequestFeedBack() {
    this.requestFeedBack = !this.requestFeedBack;
  }

  togglepopupCancelApplication() {
    this.popupCancelApplication = !this.popupCancelApplication;
  }

  togglepopupDeleteOrStartStartup(data) {
    if (data === "start") {
      this.isStartStartup = true;
    } else {
      this.isStartStartup = false;
    }
    this.popupDeleteOrStartStartup = !this.popupDeleteOrStartStartup;
  }

  showMore() {
    if (this.updatableFeedbacks.length > this.maxLengthActivity) {
      this.maxLengthActivity += 3;
    }
  }

  deleteStartup(startupName, startupId) {
    this.$emit("deleteStartup", startupId, startupName);
  }

  togglePopupGuide() {
    this.popupGuide = !this.popupGuide;
  }

  saveSourses() {
    this.toggleEditGuide();
  }

  saveGuide() {
    this.toggleEditGuide();
    scrollToHeader();
  }

  leveProject() {
    this.$emit("leaveProject");
    this.$router.push("/startups");
  }

  mounted() {
    if (this.startup.state === "in_progress") {
      this.isStarted = true;
    } else if (this.startup.state === "finished") {
      this.finished = true;
    } else if (this.startup.state === "review") {
      this.review = true;
    }

    this.startup.positions.forEach((item) => {
      if (
        item.applications.some(
          (el) => el.status === "accepted" || el.status === "advanced"
        )
      ) {
        this.teamMember.push(item);
      }
    });

    this.openPosition = this.startup.positions.filter(
      (position) => position.status === "open"
    );
    this.staffedPosition = this.startup.positions.filter(
      (position) => position.status === "staffed"
    );
    this.updateKey = 1;

    this.moveAwayStartup = this.startup.id;
    this.moveAwayStartupName = this.startup.title;

    if (this.feedbacks !== null) {
      this.feedbackFilterByPublickFlag(this.feedbacks);
      this.feedbackFilterByPrivateFlag(this.feedbacks);
    }

    if (this.notification === "request") {
      this.requestToTeam = !this.requestToTeam;
    }
  }

  feedbackFilterByPublickFlag(feedbacks) {
    this.updatableFeedbacks = feedbacks.filter((el) => el.is_public);
  }

  // feedbackFilterByPrivateFlag(feedbacks) {
  //   this.newFeedbacksData = feedbacks.filter((el) => !el.is_public);
  // }
  feedbackFilterByPrivateFlag(feedbacks) {
    this.feedbacksData = feedbacks;
  }

  teamNotificationFeedback() {
    const recipients = this.updatableDataApplications.filter(
      (el) => el.status === "accepted" || el.status === "advanced"
    );
    recipients.push({ user: { id: this.startup.owner.id } });
    this.createNotification(recipients, "teamFeedback");
  }

  requestFeedback() {
    this.toggleNewFeedBack();
    this.toggleRequestFeedBack();
  }

  async createNotification(recipients, flag) {
    const comment =
      flag === "accept"
        ? "accepted new member"
        : flag === "requestFeedback"
        ? "requested feedback"
        : flag === "teamFeedback"
        ? "left team feedback"
        : flag === "advanced"
        ? "change users premission"
        : flag === "decline"
        ? "change users premission"
        : "";
    const link = this.startup.slug;
    try {
      const newNotification = await this.$createNotificationForStartup(
        this.userId,
        comment,
        link,
        "feedback",
        this.startup.id
      );
      if (newNotification !== null) {
        for (const recipient of recipients) {
          await this.$createUserNotification(
            recipient.user.id,
            newNotification.id
          );
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  async createFedbackNotification() {
    try {
      const experts = await this.$expertProfiles();
      if (experts !== null) {
        console.log(experts);
        this.createNotification(experts, "requestFeedback");
      }
    } catch (e) {
      console.error(e);
    }
  }

  chagePremission(premission) {
    if (this.changedPremissionOnTeam.some((el) => el[0] === premission[0])) {
      this.changedPremissionOnTeam.forEach((item) => {
        if (item[0] === premission[0]) {
          item[1] = premission[1];
        }
      });
    } else {
      this.changedPremissionOnTeam.push(premission);
    }
  }

  async accept(id) {
    this.loading = true;
    try {
      const accept = await this.$applicationAccept(id);
      if (accept) {
        const startup = await this.$startupById(this.startup.id);
        const { applications } = await this.$applicationsByStartupId(
          this.startup.id
        );
        if (startup !== null) {
          this.updatableDataStartup = startup;
          if (this.startup.state === "in_progress") {
            return (this.isStarted = true);
          } else if (this.startup.state === "finished") {
            return (this.finished = true);
          }
          this.changeTeam(startup);

          this.openPosition = this.startup.positions.filter(
            (position) => position.status === "open"
          );
          this.updateKey = 1;
          this.moveAwayStartup = this.startup.id;
          this.moveAwayStartupName = this.startup.title;
        }
        if (applications !== null) {
          this.updatableDataApplications = applications;
          const recipients = this.updatableDataApplications.filter(
            (el) => el.status === "accepted" || el.status === "advanced"
          );

          this.createNotification(recipients, "accept");
        }
        this.loading = false;
        this.updateKey += 1;
      } else {
        Toast.show({
          data: "Something wrong!",
          duration: 3000,
        });
        this.loading = false;
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      this.loading = false;
    }
  }

  async decline(id, declinetext) {
    this.loading = true;
    try {
      const decline = await this.$applicationDecline(id, declinetext);
      if (decline) {
        const startup = await this.$startupById(this.startup.id);
        const { applications } = await this.$applicationsByStartupId(
          this.startup.id
        );
        if (startup !== null) {
          this.updatableDataStartup = startup;
          this.changeTeam(startup);
        }
        if (applications !== null) {
          this.updatableDataApplications = applications;
          const recipients = this.updatableDataApplications.filter(
            (el) => el.status === "accepted" || el.status === "advanced"
          );
          this.createNotification(recipients, "decline");
        }
        this.loading = false;
        this.updateKey += 1;
      } else {
        Toast.show({
          data: "Something wrong!",
          duration: 3000,
        });
        this.loading = false;
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      this.loading = false;
    }
  }

  async advancedAccess(id) {
    this.loading = true;
    try {
      const advancedAccess = await this.$applicationAdvancedAccess(id);
      if (advancedAccess) {
        const startup = await this.$startupById(this.startup.id);
        const { applications } = await this.$applicationsByStartupId(
          this.startup.id
        );
        if (startup !== null) {
          this.updatableDataStartup = startup;
          this.changeTeam(startup);
        }
        if (applications !== null) {
          this.updatableDataApplications = applications;
          const recipients = this.updatableDataApplications.filter(
            (el) => el.status === "accepted" || el.status === "advanced"
          );
          this.createNotification(recipients, "advanced");
        }

        this.loading = false;
        this.updateKey += 1;
      } else {
        Toast.show({
          data: "Something wrong!",
          duration: 3000,
        });
        this.loading = false;
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      this.loading = false;
    }
  }

  changeTeam(id) {
    this.teamMember.forEach((item) => {
      item.applications = item.applications.filter((el) => el.id !== id);
    });
    this.updateKey += 1;
  }

  removeUserMember(id) {
    this.deleteApplicationCash.push(id);

    this.changeTeam(id);
  }

  async startStartup(state) {
    this.loading = true;
    const date = new Date().toISOString();
    try {
      const updateStartup = await this.$updateStateStartup(
        this.startup.id,
        state,
        date
      );
      if (+this.startup.id === +updateStartup.id) {
        const startup = await this.$startupById(this.startup.id);
        if (startup !== null) {
          this.updatableDataStartup = startup;
          this.isStarted = true;
        }
        Toast.show({
          data: "Startup started!",
          duration: 3000,
          success: true,
        });
        this.loading = false;
        this.status = startup.status;
        this.popupDeleteOrStartStartup = !this.popupDeleteOrStartStartup;
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      this.loading = false;
    }
  }

  async finishThisStartup() {
    this.loading = true;
    try {
      const finishStartup = await this.$finishStartup(this.startup.id);
      if (+this.startup.id === +finishStartup.id) {
        const startup = await this.$startupById(this.startup.id);
        if (startup !== null) {
          this.updatableDataStartup = startup;
          this.isStarted = false;
          this.finished = true;
        }
        Toast.show({
          data: "Startup finished!",
          duration: 3000,
          success: true,
        });
        this.loading = false;
        this.status = startup.status;
        this.finishStartup = !this.finishStartup;
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      this.loading = false;
    }
  }

  async updateStartup(data) {
    this.loading = true;
    try {
      const updateStartup = await this.$updateStartupInfo(
        this.startup.id,
        data.date,
        data.description,
        data.duration,
        data.title
      );
      if (+this.startup.id === +updateStartup.id) {
        Toast.show({
          data: "Startup data updated!",
          duration: 3000,
          success: true,
        });
        this.updatableDataStartup = updateStartup;
        this.loading = false;
        this.toggleEditStartupInfo();

        scrollToHeader();
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      this.loading = false;
    }
  }

  cancelEditStartupInfo() {
    this.toggleEditStartupInfo();
    scrollToHeader();
  }

  async saveEditTeam(positions) {
    try {
      if (this.deleteApplicationCash.length !== 0) {
        for (const applicationId of this.deleteApplicationCash) {
          await this.$cancelApplication(applicationId);
        }
      }
      if (this.changedPremissionOnTeam.length !== 0) {
        for (const premission of this.changedPremissionOnTeam) {
          if (premission[1] === "Advanced access") {
            await this.$applicationAdvancedAccess(premission[0]);
          } else {
            await this.$applicationAccept(premission[0]);
          }
        }
      }
      if (positions.length !== 0) {
        let i = 0;
        for (const position of positions) {
          if (
            !!this.updatableDataStartup.positions[i] &&
            +position.id === +this.updatableDataStartup.positions[i].id &&
            position.status !== this.updatableDataStartup.positions[i].status
          ) {
            await this.$updateStatusPosition(position.id, position.status);
          }
          i++;
        }
      }

      const startup = await this.$startupById(this.startup.id);
      if (startup !== null) {
        this.updatableDataStartup = startup;
        this.openPosition = this.updatableDataStartup.positions.filter(
          (position) => position.status === "open"
        );
        this.staffedPosition = this.updatableDataStartup.positions.filter(
          (position) => position.status === "staffed"
        );
        this.teamMember = [];
        startup.positions.forEach((item) => {
          if (
            item.applications.some(
              (el) => el.status === "accepted" || el.status === "advanced"
            )
          ) {
            this.teamMember.push(item);
          }
        });
        this.toggleEditTeam();
        scrollToHeader();
      }
    } catch (e) {
      console.error(e);
      this.toggleEditTeam();
      scrollToHeader();
    }
  }

  async cancelEditTeam() {
    this.toggleEditTeam();
    scrollToHeader();
    try {
      const startup = await this.$startupById(this.startup.id);
      if (startup !== null) {
        this.teamMember = [];
        startup.positions.forEach((item) => {
          if (
            item.applications.some(
              (el) => el.status === "accepted" || el.status === "advanced"
            )
          ) {
            this.teamMember.push(item);
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async saveSources() {
    try {
      const startup = await this.$startupById(this.startup.id);
      if (startup !== null) {
        this.updatableDataStartup = startup;
        this.toggleEditSources();
        scrollToHeader();
      }
    } catch (e) {
      console.error(e);
      this.toggleEditSources();
      scrollToHeader();
    }
  }

  cancelSources() {
    this.toggleEditSources();
    scrollToHeader();
  }

  async updateFeedbacks() {
    this.loading = true;
    try {
      const feedbacks = await this.$feedbacksByStartupID(this.startup.id);
      if (feedbacks !== null) {
        this.feedbackFilterByPublickFlag(feedbacks);
        this.feedbackFilterByPrivateFlag(feedbacks);
      }

      this.loading = false;
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      this.loading = false;
    }
  }
}
</script>
