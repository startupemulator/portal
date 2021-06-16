<template>
  <div class="challenge-page">
    <ChallengeTask
      v-if="challengeTask"
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
    ></ChallengeTask>
    <ParticipantSolution
      v-if="participantSolution"
      :feedbacks="feedbacks"
      :challenge="challenge"
      :user-id="userId"
      :is-expert="isExpert"
      :solution-data="solutionData"
      @clikOnButton="toggleChallengeTask"
    ></ParticipantSolution>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import ChallengeTask from "./challengeTask.vue";
import ParticipantSolution from "./participantSolution.vue";
import { Challenge } from "~/models/Challenge";
import { Profile } from "~/models/Profile";
import { userChallenges } from "~/models/UserChallenges";
import { AskFeedbacks } from "~/models/AskFeedbacks";

@Component({
  components: { ChallengeTask, ParticipantSolution },
})
export default class extends Vue {
  @Prop() challenge: Array<Challenge>;
  @Prop() userId: string;
  @Prop() profile: Array<Profile>;
  @Prop() askfeedbacks: Array<AskFeedbacks>;

  @Prop() userChallenges: Array<userChallenges>;
  @Prop() userChallenge: Array<userChallenges>;
  @Prop() previosParticipaints: Array<userChallenges>;

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
    console.log(data);
    this.participantSolution = !this.participantSolution;
    this.challengeTask = !this.challengeTask;
  }

  mounted() {
    if (
      this.userChallenges.some(
        (el) => +el.user.id === +this.userChallenge.user.id
      )
    ) {
      this.isDeveloper = true;
      this.isStarted = true;
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
    if (
      this.askfeedbacks !== null &&
      this.askfeedbacks.some(
        (el) => +el.creator.id === +this.userChallenge.user.id
      )
    ) {
      this.isDeveloper = false;
      this.isStarted = false;
      this.finished = true;
    }
  }
}
</script>
