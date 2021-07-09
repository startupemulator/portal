<template>
  <div class="challenge-page">
    <ChallengeTask
      v-if="challengeTask"
      :key="isExpert"
      :is-started="isStarted"
      :finished="finished"
      :is-developer="isDeveloper"
      :is-expert="isExpert"
      :challenge="challenge"
      :user-id="userId"
      :user-challenges="userChallenges"
      :user-challenge="userChallenge"
      :profile="profile"
      :feedbacks="feedbacks"
      :askfeedbacks="askfeedbacks"
      :previos-participaints="previosParticipaints"
      @clickOnButton="toggleChallengeTask"
      @openParticipantSolution="toggleChallengeTask"
      @participantRequest="participantRequest"
      @requestIsSend="$emit('requestIsSend')"
    ></ChallengeTask>

    <ParticipantSolution
      v-if="participantSolution"
      :feedbacks="feedbacks"
      :challenge="challenge"
      :user-id="userId"
      :is-expert="isExpert"
      :solution-data="solutionData"
      :directions="directions"
      :badges="badges"
      :expert-id="profile.length !== 0 ? profile.user.id : null"
      @clikOnButton="toggleChallengeTask"
    ></ParticipantSolution>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

import ParticipantSolution from "./participantSolution.vue";
import ChallengeTask from "./challengeTask.vue";
import { Challenge } from "~/models/Challenge";
import { Profile } from "~/models/Profile";
import { userChallenges } from "~/models/UserChallenges";
import { AskFeedbacks } from "~/models/AskFeedbacks";
import { Directions } from "~/models/Directions";
import { Badges } from "~/models/Badges";

@Component({
  components: { ChallengeTask, ParticipantSolution },
})
export default class extends Vue {
  @Prop() challenge: Array<Challenge>;
  @Prop() userId: string;
  @Prop() profile: Array<Profile>;
  @Prop() askfeedbacks: Array<AskFeedbacks>;
  @Prop() directions: Array<Directions>;
  @Prop() userChallenges: Array<userChallenges>;
  @Prop() userChallenge: Array<userChallenges>;
  @Prop() previosParticipaints: Array<userChallenges>;
  @Prop() badges: Array<Badges>;

  challengeTask = true;
  participantSolution = false;
  isDeveloper = false;
  isExpert = false;
  isStarted = false;
  finished = false;
  feedbacks = [];
  solutionData = {};
  toggleParticipantSolution() {
    this.participantSolution = !this.participantSolution;
  }

  toggleChallengeTask(data) {
    this.solutionData = data;
    this.participantSolution = !this.participantSolution;
    this.challengeTask = !this.challengeTask;
  }

  participantRequest(data) {
    this.solutionData = data;
    this.participantSolution = !this.participantSolution;
    this.challengeTask = !this.challengeTask;
  }

  mounted() {
    if (
      this.userChallenge !== undefined &&
      this.userChallenges.some(
        (el) => +el.user.id === +this.userChallenge.user.id
      )
    ) {
      this.isDeveloper = true;
      this.isStarted = true;
    }
    if (
      this.askfeedbacks !== null &&
      this.userChallenge !== undefined &&
      this.askfeedbacks.some(
        (el) => +el.creator.id === +this.userChallenge.user.id
      )
    ) {
      this.isDeveloper = false;
      this.isStarted = false;
      this.finished = true;
    }
    if (this.profile.length !== 0 && this.profile.is_expert === true) {
      this.isExpert = true;
      this.isDeveloper = false;
      this.isStarted = false;
      this.finished = false;
    }
    if (this.askfeedbacks !== null) {
      this.askfeedbacks.forEach((el) =>
        el.feedbacks.forEach((item) => this.feedbacks.push(item))
      );
      this.feedbacks.sort(function (a, b) {
        if (a.published_at < b.published_at) {
          return 1;
        }
        if (a.published_at > b.published_at) {
          return -1;
        }

        return 0;
      });
    }
  }
}
</script>
