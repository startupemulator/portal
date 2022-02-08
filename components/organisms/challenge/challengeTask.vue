<template>
  <div
    class="challenge-task"
    :style="requestFeedback || addFeedback ? 'margin: 0 auto;' : ''"
  >
    <div
      v-if="!requestFeedback && !addFeedback"
      class="challenge-task__content"
    >
      <U-Back :link="'/challenges'"></U-Back>

      <div class="challenge-task__header">
        <U-Title :text="challenge.title"></U-Title>

        <div v-if="isSuperAdmin" class="applied-startup">
          <div class="applied-startup__not-started">
            <button type="button" @click="editChallenge">
              <span>Edit Challenge</span>
              <img src="~/assets/img/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>
        <div
          v-if="isStarted || finished"
          class="challenge-task__header__startup-state"
          :class="isStarted ? 'in_progress' : finished ? 'finished' : ''"
        >
          {{ isStarted ? "In progress" : finished ? "Finished" : "" }}
        </div>
      </div>

      <U-Tags
        v-for="(item, i) in challenge.specialisations"
        :key="i"
        :title="item.title"
      ></U-Tags>
      <Difficulty-Level :card="challenge"></Difficulty-Level>
      <div
        v-if="isStarted || finished"
        class="startup-card__started-start-time"
      >
        <div class="started-start-time__finished">
          <h3>Started</h3>
          <p>27 Sep 2020</p>
        </div>
        <div class="started-start-time__duration">
          <h3>Estimation</h3>
          <p>{{ userChallenge ? userChallenge.estimation : "0" }} days</p>
        </div>
      </div>
      <ul v-if="isDeveloper" class="challenge-task__header-menu-list">
        <li class="challenge-task__header-menu-item">
          <button @click="toogleRequestFeedback">
            <span>Get Feedback</span>
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </li>
        <li class="challenge-task__header-menu-item">
          <button @click="toggleCancelParticipationPopup">
            <span>Cancel Participation</span>
            <img src="~/assets/img/arrow.svg" alt="arrow" />
          </button>
        </li>
      </ul>
      <p>
        {{ challenge.description }}
      </p>
      <div v-if="!isStarted && commentExpert" class="challenge-task__button">
        <U-button
          :button-name="'Add Feedback'"
          :button-class="'u-button-blue add-feedback'"
          @clickOnButton="toggleAddFeedback"
        ></U-button>
      </div>
      <div
        v-if="!isStarted && !commentExpert && !finished"
        class="challenge-task__button"
      >
        <U-button
          :button-name="'Accept'"
          :button-class="'u-button-blue '"
          :is-link="'nuxt-link'"
          :href="'/challenge/accept/' + challenge.slug"
        ></U-button>
      </div>
      <div v-if="isExpert" class="waiting-feedback">
        <h3>
          Waiting for feedback <span> {{ newFeedbacks.length }}</span>
        </h3>

        <div
          v-for="item in newFeedbacks"
          :key="item.id"
          class="waiting-feedback__card"
        >
          <div class="waiting-feedback__card-content">
            <div class="waiting-feedback__card-person">
              <span> {{ item.creator.profile.name }}</span>

              <p>
                <!-- {{
                  new Date(item.solutions[0].published_at)
                    .toUTCString()
                    .substr(4, 12)
                }} -->
              </p>
            </div>
            <button type="button" @click="$emit('participantRequest', item)">
              <img src="~/assets/img/arrow.svg" alt="arrow" />
            </button>
          </div>
        </div>
      </div>
      <Sources
        v-if="!finished"
        :finished="finished"
        :startup="challenge"
      ></Sources>
      <Solutions
        v-if="finished"
        :solution="askfeedbacks[0].solutions"
      ></Solutions>
      <div
        v-if="!isExpert && !!userId && feedbacks.length > 0"
        class="challenge-task__feedBacks"
      >
        <h3 class="participant-solution__title">Feedback</h3>
        <Feedback-Card-Challenges
          v-for="feedback in feedbacks.slice(0, showMoreTwoFeedbacks)"
          :key="feedback.id"
          :feedback="feedback"
          :is-expert="isExpert"
          :user-id="userId"
        ></Feedback-Card-Challenges>
        <Sources v-if="finished" :startup="challenge"></Sources>

        <U-Button
          v-if="showMoreTwoFeedbacks < feedbacks.length"
          :button-name="'Show 2 More Feedback'"
          :button-class="'u-button-gray'"
          @clickOnButton="showMoreFeedbacks"
        ></U-Button>
      </div>

      <Practicipants
        :previos-participaints="previosParticipaints"
        @clickOnButton="$emit('openParticipantSolution', $event)"
      ></Practicipants>
    </div>
    <Request-Feedback
      v-if="requestFeedback"
      :profile="profile"
      :user-technologies="userTechnologies"
      :challenge-id="challenge.id"
      @clikOnButton="toogleRequestFeedback"
      @pickTechnology="pickTechnology"
      @submit="requestIsSend"
    ></Request-Feedback>
    <div v-show="cancelParticipationPopup" class="cancel-participation__popup">
      <div class="cancel-participation__popup__content">
        <button
          type="button"
          class="sign-up-link__close"
          @click="toggleCancelParticipationPopup"
        >
          <img src="~/assets/img/close.svg" alt="Close" />
        </button>
        <U-Title
          :text="'Cancel your participation in this challenge?'"
        ></U-Title>
        <div class="cancel-participation__popup__buttons">
          <U-Button
            :button-name="'Yes, Cancel'"
            :button-class="'u-button-blue'"
            @clickOnButton="cancelParticipation"
          ></U-Button>
          <U-Button
            :button-name="'No, Don’t Cancel'"
            :button-class="'u-button-gray'"
            @clickOnButton="toggleCancelParticipationPopup"
          ></U-Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import RequestFeedback from "./requestChallengeFeedback.vue";
import { Challenge } from "~/models/Challenge";

import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import Sources from "~/components/molecules/sources.vue";
import Solutions from "~/components/molecules/solutions.vue";
import Practicipants from "~/components/molecules/practicipants.vue";
import UTags from "~/components/atoms/uTags.vue";
import CommentExpert from "~/components/molecules/commentForExpert.vue";
import AddTeamFeedBack from "~/components/organisms/startup/addTeamFeedback.vue";
import DifficultyLevel from "~/components/atoms/difficultyLevel.vue";
import FeedbackCardChallenges from "~/components/molecules/feedbackCardChallenges.vue";
import { userChallenges } from "~/models/UserChallenges";
import { Profile } from "~/models/Profile";
import { Feedbacks } from "~/models/Feedbacks";
import { AskFeedbacks } from "~/models/AskFeedbacks";
import { technologies } from "~/plugins/services/technologies";

@Component({
  components: {
    UButton,
    UTitle,
    UBack,
    Sources,
    Practicipants,
    UTags,
    RequestFeedback,
    CommentExpert,
    AddTeamFeedBack,
    DifficultyLevel,
    FeedbackCardChallenges,
    Solutions,
  },
})
export default class extends Vue {
  @Prop() challenge: Array<Challenge>;
  @Prop() isStarted: Boolean;
  @Prop() finished: Boolean;
  @Prop() isSuperAdmin: Boolean;
  @Prop() isDeveloper: Boolean;
  @Prop() isExpert: Boolean;
  @Prop() userChallenges: Array<userChallenges>;
  @Prop() userId: string;
  @Prop() userChallenge: Array<userChallenges>;
  @Prop() profile: Array<Profile>;
  @Prop() previosParticipaints: Array<userChallenges>;
  @Prop() feedbacks: Array<Feedbacks>;
  @Prop() askfeedbacks: Array<AskFeedbacks>;
  requestFeedback = false;
  cancelParticipationPopup = false;
  commentExpert = false;
  addFeedback = false;
  showMoreTwoFeedbacks = 2;
  newFeedbacks = [];
  userTechnologies = [];
  showMoreFeedbacks() {
    this.showMoreTwoFeedbacks += 2;
  }

  toggleAddFeedback() {
    this.addFeedback = !this.addFeedback;
  }

  toggleCancelParticipationPopup() {
    this.cancelParticipationPopup = !this.cancelParticipationPopup;
  }

  editChallenge() {
    this.$router.push("/challenge/edit/" + this.challenge.slug);
  }

  toogleRequestFeedback() {
    this.requestFeedback = !this.requestFeedback;
  }

  requestIsSend() {
    this.$emit("requestIsSend");
  }

  async cancelParticipation() {
    try {
      if (this.userChallenge !== null) {
        await this.$deleteUserChallenges(this.userChallenge.id);
        this.$router.push("/challenges");
      }
    } catch (e) {
      console.error(e);
    }
  }

  pickTechnology({ item, id }) {
    this.userTechnologies.forEach((technology) => {
      if (item.checked && technology.id === id) {
        technology.checked = true;
      } else if (!item.cheked && technology.id === id) {
        technology.checked = false;
      }
    });
  }

  mounted() {
    if (this.askfeedbacks !== null) {
      this.newFeedbacks = this.askfeedbacks.filter(
        (el) =>
          el.is_new &&
          +el.creator.id !== +this.userId &&
          !el.feedbacks.some((item) => +item.expert.id === +this.userId)
      );
    }
    if (this.profile !== null && this.profile.technologies) {
      this.profile.technologies.forEach(
        (technology) => (technology.checked = false)
      );
      this.userTechnologies = JSON.parse(
        JSON.stringify(this.profile.technologies)
      );
    }
  }
}
</script>
