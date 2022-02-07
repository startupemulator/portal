<template>
  <div>
    <New-FeedBack
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
    ></New-FeedBack>
    <Request-Feedback
      v-show="requestFeedBack"
      :key="updateKey"
      :user-id="userId"
      @clikOnButton="toggleRequestFeedBack"
      @createFedbackNotification="createFedbackNotification"
    ></Request-Feedback>
    <Edit-Startup-Info
      v-show="editStartupInfo"
      :startup="updatableDataStartup"
      :estimations="estimations"
      @updateStartup="updateStartup($event)"
      @clikOnButton="toggleEditStartupInfo"
      @cancelEditStartupInfo="cancelEditStartupInfo"
    ></Edit-Startup-Info>
    <Edit-Team
      v-if="editTeam"
      :update-key="updateKey"
      @clikOnButton="toggleEditTeam"
      @cancelEditTeam="cancelEditTeam"
    ></Edit-Team>
    <Edit-Sources
      v-show="editSources"
      :sources="updatableDataStartup.sources"
      @clikOnButton="toggleEditSources"
      @saveSources="saveSources"
    ></Edit-Sources>
    <Edit-Guide
      v-show="editGuide"
      :secrets="updatableDataStartup.secrets"
      @clikOnButton="toggleEditGuide"
      @saveGuide="saveGuide"
    ></Edit-Guide>
    <Finish-Startup
      v-show="finishStartup"
      @clikOnButton="toggleFinishStartup"
      @finishStartup="finishThisStartup"
    ></Finish-Startup>
    <Add-Release-Links
      v-show="releaseLikns"
      :startup-id="startup.id"
      :releases="releases"
      @clikOnButton="toggleReleaseLikns"
      @saveReleaseLinks="saveReleaseLinks"
    ></Add-Release-Links>
    <Add-Team-FeedBack
      v-if="addTeamFeedBack"
      :key="updateKey + 'addFeedback'"
      :title="feedBackTitle"
      :badges="badges"
      :request-id="askFeedbacks ? askFeedbacks[0].id : null"
      :expert-id="userId"
      :directions="directions"
      @clikOnButton="toggleAddTeamFeedBack"
      @teamNotificationFeedback="teamNotificationFeedback"
    ></Add-Team-FeedBack>

    <Add-Team-Badge
      v-if="addTeamBadge"
      :badges="badges"
      :title="badgeTitle"
      @clikOnButton="toggleAddTeamBadge"
    ></Add-Team-Badge>
    <Add-Team-Badge
      v-show="addFeedBackBadge"
      :badges="badges"
      :feedback-id="feedbackIdForAddBadge"
      @clikOnButton="closeAddFeedBackBadge"
      @addedBadge="closeAddFeedBackBadge"
    ></Add-Team-Badge>
    <div
      v-show="
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
        <U-Back :title="'Startups'" :link="'/startups'"></U-Back>

        <div class="startup__header">
          <U-Title :text="'Startup #' + updatableDataStartup.id"></U-Title>
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
        <div
          v-if="isDeveloper && !isOwner && !finished"
          class="applied-startup"
        >
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
          <Comment-Expert
            v-if="isExpert && askFeedbacks !== null"
            :solution-data="askFeedbacks"
          ></Comment-Expert>
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
              v-for="link in (displayReleases = releases.filter(
                (release) => release.title !== '' && release.url !== 'https://'
              ))"
              :key="link.id + link.title"
              class="owner-menu__item"
            >
              <button type="button">
                <a :href="link.url" target="_blank">
                  <span>{{ link.title | truncate(20, "...") }} </span>

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
        <div v-if="openPositionIsEmpty" class="startup__open-position">
          <h3>Open positions</h3>

          <Open-Position-Card
            v-for="item in (position = openPosition.filter(
              (el) =>
                el.specialisation !== null &&
                !(
                  el.status === 'open' &&
                  el.applications.some(
                    (item) =>
                      item.status === 'declined' && item.user.id === userId
                  )
                )
            ))"
            :key="item.id + 'open-position'"
            :position="item"
            :is-expert="isExpert"
            :slug="updatableDataStartup.slug"
            :is-owner="isOwner"
            :is-developer="isDeveloper"
          ></Open-Position-Card>
        </div>
        <div v-cloak class="startup-card__team">
          <h3>Team</h3>
          <Project-Participant
            :username="updatableDataStartup.owner"
            :is-owner="true"
          ></Project-Participant>
          <div
            v-if="teamMember.length > 0 && (isStarted || finished)"
            class="team"
          >
            <Project-Participant
              v-for="item in teamMember"
              :key="item.id + 'project-participant' + updateKey"
              :position="item.specialisation.title"
              :username="item.applications"
            ></Project-Participant>
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
          <FeedBack-Card
            v-for="feedback in updatableFeedbacks.slice(0, maxLengthActivity)"
            :key="feedback.id + 'feedback'"
            :feedback="feedback"
            :is-expert="isExpert"
            :user-id="userId"
            @updateFeedbacks="updateFeedbacks"
            @addFeedback="toggleAddTeamFeedBack"
            @addBadge="addFeedbackBadge"
          ></FeedBack-Card>
        </div>

        <U-Button
          v-if="updatableFeedbacks.length > maxLengthActivity"
          :button-name="`Show ${
            updatableFeedbacks.length - maxLengthActivity > 3
              ? 3
              : updatableFeedbacks.length - maxLengthActivity
          } Earlier Actions`"
          :button-class="'u-button-gray button-show-earlier-actions'"
          @clickOnButton="showMore"
        ></U-Button>

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
        <U-Button
          :button-name="'Apply to Teams'"
          :button-class="'u-button-blue'"
        ></U-Button>
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
            <U-Button
              :button-name="'Yes, Cancel'"
              :button-class="'u-button-blue'"
              @clickOnButton="$emit('cancelApplication')"
            ></U-Button>
            <U-button
              :button-name="'No, Don’t Cancel'"
              :button-class="'u-button-gray'"
              @clickOnButton="togglepopupCancelApplication"
            ></U-button>
          </div>
        </div>
      </div>
      <Popup-Delete-Or-Start-Startup
        v-show="popupDeleteOrStartStartup"
        :move-away-startup="moveAwayStartup"
        :move-away-startup-name="moveAwayStartupName"
        :is-start-startup="isStartStartup"
        @clickOnButton="togglepopupDeleteOrStartStartup"
        @closePopupLinkEmail="togglepopupDeleteOrStartStartup"
        @deleteStartup="deleteStartup"
        @startStartup="startStartup('in_progress')"
      ></Popup-Delete-Or-Start-Startup>
      <Guide-Popup
        v-if="popupGuide"
        :startup="updatableDataStartup"
        @closePopup="togglePopupGuide"
      ></Guide-Popup>
    </div>
    <Popup-Leave-Project
      v-if="popupLeaveProject"
      @closePopupLeaveproject="togglepopupLeaveProject"
      @leveProject="$emit('cancelApplication')"
    ></Popup-Leave-Project>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import FeedBackCard from "../../molecules/feedbackCard.vue";
import GuidePopup from "../../molecules/popupGuide.vue";
import { Estimation } from "../../../models/Estimation";
import Spinner from "../../../store/modules/Spinner";

import NewFeedBack from "./newFeedBack.vue";
import RequestFeedback from "./requestFeedback.vue";
import EditStartupInfo from "./editStartupInfo.vue";
import EditTeam from "./editTeam.vue";
import EditSources from "./editSources.vue";
import AddReleaseLinks from "./addReleseLinks.vue";
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
    Sources,
    NewFeedBack,
    RequestFeedback,
    EditStartupInfo,
    EditTeam,
    EditSources,
    AddReleaseLinks,
    EditGuide,
    FinishStartup,
    AddTeamFeedBack,
    AddTeamBadge,
    CommentExpert,
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
  openPositionIsEmpty = false;

  deleteApplicationCash = [];
  changedPremissionOnTeam = [];
  toggleReleaseLikns() {
    this.releaseLikns = !this.releaseLikns;
    scrollToHeader();
  }

  saveReleaseLinks() {
    this.releaseLikns = !this.releaseLikns;
    scrollToHeader();
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

    if (
      this.openPosition.length > 0 &&
      !this.finished &&
      !this.openPosition.some(
        (el) =>
          el.status === "open" &&
          el.applications.some(
            (item) => item.status === "declined" && item.user.id === this.userId
          )
      )
    ) {
      this.openPositionIsEmpty = true;
    }

    this.updateKey = 1;

    this.moveAwayStartup = this.startup.id;
    this.moveAwayStartupName = this.startup.title;

    if (this.feedbacks !== null) {
      this.feedbackFilterByPublickFlag(this.feedbacks);
      this.feedbackFilterByPrivateFlag(this.feedbacks);
    }
  }

  feedbackFilterByPublickFlag(feedbacks) {
    this.updatableFeedbacks = feedbacks.filter((el) => el.is_public);
  }

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
        flag === "advanced" || flag === "decline" ? "default" : "feedback",
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
        this.createNotification(experts, "requestFeedback");
      }
    } catch (e) {
      console.error(e);
    }
  }

  async startStartup(state) {
    Spinner.show();
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
        Spinner.hide();
        this.status = startup.status;
        this.popupDeleteOrStartStartup = !this.popupDeleteOrStartStartup;
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      Spinner.hide();
    }
  }

  async finishThisStartup() {
    Spinner.show();
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
        Spinner.hide();
        this.status = startup.status;
        this.finishStartup = !this.finishStartup;
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      Spinner.hide();
    }
  }

  async updateStartup(data) {
    Spinner.show();
    try {
      const title = data.title.replace(/[^a-zA-Z ]/g, "");
      const description = data.description.replace(/(\n)/gm, " \\n ");
      const updateStartup = await this.$updateStartupInfo(
        this.startup.id,
        data.date,
        description,
        data.duration,
        title
      );
      if (+this.startup.id === +updateStartup.id) {
        Toast.show({
          data: "Startup data updated!",
          duration: 3000,
          success: true,
        });
        this.updatableDataStartup = updateStartup;
        Spinner.hide();
        this.toggleEditStartupInfo();

        scrollToHeader();
      }
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      Spinner.hide();
    }
  }

  cancelEditStartupInfo() {
    this.toggleEditStartupInfo();
    scrollToHeader();
  }

  cancelEditTeam() {
    this.toggleEditTeam();
    scrollToHeader();
  }

  saveSources() {
    this.toggleEditSources();
    scrollToHeader();
  }

  async updateFeedbacks() {
    Spinner.show();
    try {
      const feedbacks = await this.$feedbacksByStartupID(this.startup.id);
      if (feedbacks !== null) {
        this.feedbackFilterByPublickFlag(feedbacks);
        this.feedbackFilterByPrivateFlag(feedbacks);
      }

      Spinner.hide();
    } catch (e) {
      console.error(e);
      Toast.show({
        data: e.message,
        duration: 3000,
      });
      Spinner.hide();
    }
  }
}
</script>
