<template>
  <div>
    }
    <RequestToTeam
      v-show="requestToTeam"
      @clikOnButton="toggleRequestToTeam"
    ></RequestToTeam>
    <NewFeedBack
      v-show="newFeedBack"
      @clikOnButton="toggleNewFeedBack"
    ></NewFeedBack>
    <RequestFeedback
      v-show="requestFeedBack"
      @clikOnButton="toggleRequestFeedBack"
    ></RequestFeedback>
    <EditStartupInfo
      v-show="editStartupInfo"
      @clikOnButton="toggleEditStartupInfo"
    ></EditStartupInfo>
    <EditTeam v-show="editTeam" @clikOnButton="toggleEditTeam"></EditTeam>
    <EditSources
      v-show="editSources"
      @clikOnButton="toggleEditSources"
    ></EditSources>
    <EditGuide v-show="editGuide" @clikOnButton="toggleEditGuide"></EditGuide>
    <FinishStartup
      v-show="finishStartup"
      @clikOnButton="toggleFinishStartup"
    ></FinishStartup>
    <EditSources
      v-show="releaseLikns"
      :title="'Add release links'"
      :description="'Add links on your published product, a case, an article, etc.'"
      @clikOnButton="toggleReleaseLikns"
    ></EditSources>
    <AddTeamFeedBack
      v-show="addTeamFeedBack"
      @clikOnButton="toggleAddTeamFeedBack"
    ></AddTeamFeedBack>
    <AddTeamBadge
      v-show="addTeamBadge"
      @clikOnButton="toggleAddTeamBadge"
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
        !addTeamBadge
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
          <U-title :text="'Startup #' + startup.id"></U-title>
          <div
            class="startup__header__startup-state"
            :class="isStarted ? 'started' : finished ? 'finished' : ''"
          >
            {{ startup.state.split("_").join(" ") | capitalize }}
          </div>
        </div>
        <div class="startup-card__started-start-time">
          <div class="started-start-time__start">
            <h3>Start</h3>
            <p>
              {{ new Date(startup.created_at).toUTCString().substr(4, 12) }}
            </p>
          </div>
          <div class="started-start-time__duration">
            <h3>Duration</h3>
            <p>{{ startup.duration }} months</p>
          </div>
        </div>
        <div v-if="isDeveloper" class="applied-startup">
          <div v-if="!isStarted" class="applied-startup__not-started">
            <h4>
              You applied to this startup as a <span>Back-end Developer</span>
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
            <button type="button">
              <span>Leave Project</span>
              <img src="~/assets/img/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>
        <div v-if="isExpert" class="applied-startup">
          <div class="applied-startup__started">
            <button type="button" @click="toggleAddTeamFeedBack">
              <span>Add Team Feedback</span>
              <img src="~/assets/img/arrow.svg" alt="arrow" />
            </button>
            <button type="button" @click="toggleAddTeamBadge">
              <span>Add Team Badge</span>
              <img src="~/assets/img/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>

        <p class="startup__description">
          {{ startup.description }}
        </p>
        <CommentExpert v-if="isExpert"></CommentExpert>

        <div v-if="isOwner" class="owner-menu">
          <ul v-if="!finished" class="owner-menu__list">
            <li class="owner-menu__item">
              <button
                v-if="!isStarted"
                type="button"
                @click="toggleRequestToTeam"
              >
                <span
                  >Requests to Team
                  <div class="owner-menu__item--message">
                    <span>2</span>
                  </div></span
                >
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
              <button v-if="isStarted" type="button" @click="toggleNewFeedBack">
                <span
                  >New Feedback
                  <div class="owner-menu__item--message">
                    <span>2</span>
                  </div></span
                >
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li class="owner-menu__item">
              <button v-if="!isStarted" type="button">
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
              <button type="button" @click="togglePopupDeleteStartup">
                <span v-if="!isStarted">Delete Startup</span>
                <span v-if="isStarted">Finish Startup</span>
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
          </ul>
          <ul v-if="finished" class="owner-menu__list">
            <li class="owner-menu__item">
              <button type="button" @click="toggleReleaseLikns">
                <span>Add Release Links </span>
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li class="owner-menu__item">
              <button type="button">
                <span>See on Product Hunt </span>
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
            <li class="owner-menu__item">
              <button type="button">
                <span>Read Study Case </span>
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="startup_block-2">
        <div v-if="!finished" class="startup__open-position">
          <h3>Open positions</h3>
          <Open-position-card
            v-for="item in 3"
            :key="item.id"
            :startup="item"
          ></Open-position-card>
        </div>
        <div class="startup-card__team">
          <h3>Team</h3>

          <project-participant
            v-for="(item, i) in 2"
            :key="i"
          ></project-participant>
        </div>
      </div>
      <div v-if="isStarted || finished" class="startup_block-3">
        <Sources :finished="finished"></Sources>
        <div class="startup-card__activity">
          <h3>Activity</h3>
          <!-- Statick -> change to feed-back-card -->

          <div class="startup-card__activity-content">
            <h4>Full Name <span>makes</span> Merge request</h4>
            <p>6 Sep 2020 00:45</p>
            <div class="startup-card__activity-like" style="margin-top: 16px">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.75259 3.21064C0.569897 4.54117 0 6.28693 0 8C0 11.9264 2.76324 15.6775 5.41789 18.3321C6.77259 19.6868 8.15969 20.8164 9.28038 21.6122C9.83982 22.0095 10.3444 22.3318 10.7546 22.5597C10.9584 22.6729 11.1536 22.7711 11.3297 22.8438C11.4652 22.8999 11.7229 23 12 23C12.2771 23 12.5348 22.8999 12.6703 22.8438C12.8464 22.7711 13.0416 22.6729 13.2454 22.5597C13.6556 22.3318 14.1602 22.0095 14.7196 21.6122C15.8403 20.8164 17.2274 19.6868 18.5821 18.3321C21.2368 15.6775 24 11.9264 24 8C24 6.28693 23.4301 4.54117 22.2474 3.21064C21.0484 1.8617 19.2714 1 17 1C15.1575 1 13.7886 1.90247 12.8652 2.85697C12.5259 3.20774 12.2385 3.57331 12 3.91926C11.7615 3.57331 11.4741 3.20774 11.1348 2.85697C10.2114 1.90247 8.84246 1 7 1C4.72864 1 2.95164 1.8617 1.75259 3.21064ZM2 8C2 11.0736 4.23676 14.3225 6.83211 16.9179C8.10242 18.1882 9.40281 19.2461 10.4384 19.9815C10.9571 20.3499 11.3978 20.6291 11.7259 20.8114C11.8364 20.8728 11.9277 20.9196 12 20.9537C12.0723 20.9196 12.1636 20.8728 12.2741 20.8114C12.6022 20.6291 13.0429 20.3499 13.5616 19.9815C14.5972 19.2461 15.8976 18.1882 17.1679 16.9179C19.7632 14.3225 22 11.0736 22 8C22 6.71307 21.5699 5.45883 20.7526 4.53936C19.9516 3.6383 18.7286 3 17 3C15.8688 3 14.9859 3.54124 14.3027 4.24754C13.6118 4.96175 13.1878 5.78521 13.0146 6.16804C12.8028 6.63605 12.3544 6.81897 12 6.81897C11.6456 6.81897 11.1972 6.63605 10.9854 6.16804C10.8122 5.78521 10.3882 4.96175 9.69732 4.24754C9.01406 3.54124 8.13121 3 7 3C5.27136 3 4.04836 3.6383 3.24741 4.53936C2.4301 5.45883 2 6.71307 2 8ZM11.8427 21.0189C11.8429 21.0188 11.8461 21.0177 11.8521 21.0161C11.8457 21.0183 11.8426 21.0191 11.8427 21.0189ZM12.1573 21.0189C12.1571 21.0188 12.1539 21.0177 12.1479 21.0162C12.1517 21.0174 12.1543 21.0182 12.1558 21.0186C12.1568 21.0189 12.1573 21.019 12.1573 21.0189Z"
                  fill="#5E56F0"
                />
              </svg>
              <span class="startup-card__activity-like-count">3</span>
            </div>
          </div>
          <!-- Statick -> change to feed-back-card (end)-->
          <feed-back-card
            v-for="testimonial in 1"
            :key="testimonial.id"
            :comment="testimonial.comment"
            :author="testimonial.author"
            :published="testimonial.published_at"
            :is_expert="isExpert"
          >
          </feed-back-card>
          <feed-back-card
            v-for="testimonial in 1"
            :key="testimonial.id"
            :comment="testimonial.comment"
            :author="testimonial.author"
            :published="testimonial.published_at"
            :activity_state="true"
            :show_feedback="false"
            :is_expert="isExpert"
          ></feed-back-card>
        </div>
        <U-button
          :button-name="'Show ' + '23' + ' Earlier Actions'"
          :button-class="'u-button-gray button-show-earlier-actions'"
        ></U-button>

        <div class="project-started">
          <h4>Project started</h4>
          <p>{{ new Date(startup.start_date).toUTCString().substr(4, 18) }}</p>
        </div>
      </div>
      <div class="position-card__developer__primary-button">
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
            ></U-button>
            <U-button
              :button-name="'No, Don’t Cancel'"
              :button-class="'u-button-gray'"
              @clickOnButton="togglepopupCancelApplication"
            ></U-button>
          </div>
        </div>
      </div>
      <PopupDeleteStartup
        v-show="popupDeleteStartup"
        @clickOnButton="togglePopupDeleteStartup"
        @closePopupLinkEmail="togglePopupDeleteStartup"
      ></PopupDeleteStartup>
      <GuidePopup v-if="popupGuide" @closePopup="togglePopupGuide"></GuidePopup>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import FeedBackCard from "../../molecules/feedbackCard.vue";
import GuidePopup from "../../molecules/popupGuide.vue";
import RequestToTeam from "./requestsToTeam.vue";
import newFeedBack from "./newFeedBack.vue";
import RequestFeedback from "./requestFeedback.vue";
import EditStartupInfo from "./editStartupInfo.vue";
import EditTeam from "./editTeam.vue";
import EditSources from "./editSources.vue";
import EditGuide from "./editGuide.vue";
import FinishStartup from "./finishStartup.vue";
import AddTeamFeedBack from "./addTeamFeedback.vue";
import AddTeamBadge from "./addTeamBadge.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import OpenPositionCard from "~/components/molecules/openPositionCard.vue";
import { Startup } from "~/models/Startup";
import UButton from "~/components/atoms/uButton.vue";
import PopupDeleteStartup from "~/components/molecules/popupDeleteStartup.vue";
import projectParticipant from "~/components/molecules/projectParticipant.vue";
import { Testimonial } from "~/models/Testimonial";
import Sources from "~/components/molecules/sources.vue";
import CommentExpert from "~/components/molecules/commentForExpert.vue";
@Component({
  components: {
    UBack,
    UButton,
    UTitle,
    OpenPositionCard,
    PopupDeleteStartup,
    projectParticipant,
    FeedBackCard,
    GuidePopup,
    RequestToTeam,
    Sources,
    newFeedBack,
    RequestFeedback,
    EditStartupInfo,
    EditTeam,
    EditSources,
    EditGuide,
    FinishStartup,
    AddTeamFeedBack,
    AddTeamBadge,
    CommentExpert,
  },
})
export default class extends Vue {
  @Prop() startup: Array<Startup>;
  @Prop() testimonials: Array<Testimonial>;
  popupCancelApplication = false;
  isDeveloper = false;
  isExpert = false;
  isOwner = false;
  isStarted = false;
  popupDeleteStartup = false;
  popupGuide = false;
  finished = false;
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

  toggleReleaseLikns() {
    this.releaseLikns = !this.releaseLikns;
  }

  toggleAddTeamBadge() {
    this.addTeamBadge = !this.addTeamBadge;
  }

  toggleAddTeamFeedBack() {
    this.addTeamFeedBack = !this.addTeamFeedBack;
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

  togglePopupDeleteStartup() {
    this.popupDeleteStartup = !this.popupDeleteStartup;
  }

  togglePopupGuide() {
    this.popupGuide = !this.popupGuide;
  }

  mounted() {
    if (this.startup.state === "in_progress") {
      return (this.isStarted = true);
    } else if (this.startup.state === "finished") {
      return (this.finished = true);
    }
  }
}
</script>