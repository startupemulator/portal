<template>
  <div class="challenge-page">
    <!-- <pre style="color: #fff"> {{ challenge }}</pre> -->

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
      @clickOnButton="toggleChallengeTask"
      @openParticipantSolution="toggleChallengeTask"
    ></ChallengeTask>
    <ParticipantSolution
      v-if="participantSolution"
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

@Component({
  components: { ChallengeTask, ParticipantSolution },
})
export default class extends Vue {
  @Prop() challenge: Array<Challenge>;
  @Prop() userId: string;
  @Prop() profile: Array<Profile>;

  @Prop() userChallenges: Array<userChallenges>;
  @Prop() userChallenge: Array<userChallenges>;

  challengeTask = true;
  participantSolution = false;
  isDeveloper = false;
  isExpert = false;
  isStarted = false;
  finished = false;

  toggleParticipantSolution() {
    this.participantSolution = !this.participantSolution;
  }

  toggleChallengeTask() {
    this.participantSolution = !this.participantSolution;
    this.challengeTask = !this.challengeTask;
  }

  mounted() {
    console.log(this.userChallenge);
    if (this.userChallenge) {
      this.isDeveloper = true;
      this.isStarted = true;
    }
  }
}
</script>
