<template>
  <div class="challenge-page">
    <ChallengeTask
      v-if="challengeTask"
      :is-started="isStarted"
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
import { Component, Vue } from "nuxt-property-decorator";
import ChallengeTask from "./challengeTask.vue";
import ParticipantSolution from "./participantSolution.vue";

@Component({
  components: { ChallengeTask, ParticipantSolution },
})
export default class extends Vue {
  challengeTask = true;
  participantSolution = false;
  isStarted = true;

  toggleParticipantSolution() {
    this.participantSolution = !this.participantSolution;
  }

  toggleChallengeTask() {
    this.participantSolution = !this.participantSolution;
    this.challengeTask = !this.challengeTask;
  }
}
</script>
