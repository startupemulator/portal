<template>
  <div
    class="challenge-task"
    :style="requestFeedback || addFeedback ? 'margin: 0 auto;' : ''"
  >
    <div
      v-show="!requestFeedback && !addFeedback"
      class="challenge-task__content"
    >
      <UBack :link="'/challenges'"></UBack>
      <div class="challenge-task__header">
        <UTitle :text="'Task Name'"></UTitle>
        <div
          v-if="isStarted || finished"
          class="challenge-task__header__startup-state"
          :class="isStarted ? 'in_progress' : finished ? 'finished' : ''"
        >
          In progress
        </div>
      </div>

      <UTags
        v-for="(item, i) in 2"
        :key="i"
        :title="i < 1 ? 'UI/UX Designer' : 'Front-end Developer'"
      ></UTags>
      <DifficultyLevel></DifficultyLevel>
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
          <p>3 months</p>
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
        The goal is to implement Learning Management Portal - a portal for
        managing the educational process and teaching materials as part of the
        university curriculum. Our purposes are remove the manual work of the
        teacher; combine online learning tools in one tool; give students easy
        access to materials; simplify the implementation and validation of
        practical tasks; open access to current ratings.
      </p>
      <CommentExpert v-if="isExpert"></CommentExpert>
      <div v-if="!isStarted && commentExpert" class="challenge-task__button">
        <U-button
          :button-name="'Add Feedback'"
          :button-class="'u-button-blue add-feedback'"
          @clickOnButton="toggleAddFeedback"
        ></U-button>
      </div>
      <div v-if="!isStarted && !commentExpert" class="challenge-task__button">
        <U-button
          :button-name="'Take Part'"
          :button-class="'u-button-blue '"
        ></U-button>
      </div>

      <Sources
        :finished="true"
        :title="'Solution'"
        :link1="'Link 1'"
        :link2="'Link 2'"
      ></Sources>
      <div class="used-technologies">
        <h3>Used technologies</h3>
        <UTags
          v-for="(item, i) in 9"
          :key="i"
          :title="i < 3 ? 'Javascript' : i < 6 ? 'Java' : 'HTML5'"
        ></UTags>
      </div>
      <div v-if="true" class="challenge-task__feedBacks">
        <h3 class="participant-solution__title">Feedback</h3>
        <FeedBackCard
          :comment="'Some comment and feedback from an expert that belongs to some exact action in this list.'"
        ></FeedBackCard>
        <FeedBackCard
          :profile-img="false"
          :comment="'Some comment and feedback from an expert that belongs to some exact action in this list.'"
        ></FeedBackCard>
        <U-button
          :button-name="'Show 2 More Feedback'"
          :button-class="'u-button-gray'"
        ></U-button>
        <div v-if="isExpert" class="waiting-feedback">
          <h3>Waiting for feedback <span>3</span></h3>
          <div v-for="(item, i) in 2" :key="i" class="waiting-feedback__card">
            <div class="waiting-feedback__card-content">
              <div class="waiting-feedback__card-person">
                <span> {{ i === 1 ? "Name Surname" : "Full Name" }}</span>
                <p>27 Sep 2020</p>
              </div>
              <button type="button">
                <img src="~/assets/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        </div>

        <Sources
          :finished="true"
          class="challenge-task__feedBacks-sources"
        ></Sources>
      </div>
      <Practicipants
        @clickOnButton="$emit('openParticipantSolution')"
      ></Practicipants>
    </div>
    <RequestFeedback
      v-show="requestFeedback"
      @clikOnButton="toogleRequestFeedback"
    ></RequestFeedback>
    <div v-show="cancelParticipationPopup" class="cancel-participation__popup">
      <div class="cancel-participation__popup__content">
        <button
          type="button"
          class="sign-up-link__close"
          @click="toggleCancelParticipationPopup"
        >
          <img src="~/assets/img/close.svg" alt="Close" />
        </button>
        <UTitle :text="'Cancel your participation in this challenge?'"></UTitle>
        <div class="cancel-participation__popup__buttons">
          <U-button
            :button-name="'Yes, Cancel'"
            :button-class="'u-button-blue'"
          ></U-button>
          <U-button
            :button-name="'No, Don’t Cancel'"
            :button-class="'u-button-gray'"
            @clickOnButton="toggleCancelParticipationPopup"
          ></U-button>
        </div>
      </div>
    </div>
    <AddTeamFeedBack
      v-show="addFeedback"
      @clikOnButton="toggleAddFeedback"
    ></AddTeamFeedBack>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import RequestFeedback from "./requestFeedback.vue";
import UBack from "~/components/atoms/uBack.vue";
import UTitle from "~/components/atoms/uTitle.vue";
import UButton from "~/components/atoms/uButton.vue";
import Sources from "~/components/molecules/sources.vue";
import Practicipants from "~/components/molecules/practicipants.vue";
import UTags from "~/components/atoms/uTags.vue";
import CommentExpert from "~/components/molecules/commentForExpert.vue";
import AddTeamFeedBack from "~/components/organisms/startup/addTeamFeedback.vue";
import DifficultyLevel from "~/components/atoms/difficultyLevel.vue";

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
  },
})
export default class extends Vue {
  @Prop() isStarted: Boolean;
  @Prop() finished: Boolean;
  @Prop() isDeveloper: Boolean;
  @Prop() isExpert: Boolean;
  requestFeedback = false;
  cancelParticipationPopup = false;
  commentExpert = false;
  addFeedback = false;

  toggleAddFeedback() {
    this.addFeedback = !this.addFeedback;
  }

  toggleCancelParticipationPopup() {
    this.cancelParticipationPopup = !this.cancelParticipationPopup;
  }

  toogleRequestFeedback() {
    this.requestFeedback = !this.requestFeedback;
  }
}
</script>
